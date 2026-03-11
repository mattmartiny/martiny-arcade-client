export function moveDungeon(room:any,dir:string){

  switch(dir){

    case "north":
      return room.toTheNorth

    case "south":
      return room.toTheSouth

    case "east":
      return room.toTheEast

    case "west":
      return room.toTheWest

  }

}