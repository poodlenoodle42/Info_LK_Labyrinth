
import {Strategy, Direction, Visited} from "./Strategy.js"
import {Room} from "../raum.js";
import {roomNumToCoords, coordsToRoomNum} from "../utils/CoordConverter.js";

export class AgressivStrategy extends Strategy{

  public orderByPreferences(pos:[number, number], availableDirections:Direction[], hp:number, ap:number):Direction[]{
    availableDirections.sort((a, b) => {

      let room_a = super.getRoomFromDirection(pos, a); 
      let room_b = super.getRoomFromDirection(pos, b);;
      let lastDIrection = super.getDirectionToLastVisitedRoom();
      let directionSort = a == lastDIrection ? 1 :( b == lastDIrection ? -1 : (a - b));
      let monsterSort = room_a.monster - room_b.monster;
      let swordSort = room_b.sword - room_a.sword;

      if(swordSort == 0){
        if(monsterSort == 0){
          return directionSort;
        }else{
          return monsterSort;
        }
      }else{
        return swordSort;
      }
    });
    
    for(let direction of availableDirections){
      let roomNum = coordsToRoomNum(super.getCoordsFromDirection(pos, direction), this.breite);
      let room:Room = this.visitedRooms[roomNum][0];
      
      if(room.monster - ap - room.sword >= hp){
        this.visitedRooms[roomNum][2] = Math.max(Visited.Monster_invincible, this.visitedRooms[roomNum][2]);
      }
    }
    return availableDirections;
  }
} 