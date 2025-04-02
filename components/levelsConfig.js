const levelXP = [
    0,   // Level 1
    100, // Level 2
    200, // Level 3
    350, // Level 4
    500, // Level 5
    700, // Level 6
    1000, // Level 7
    1300, // Level 8
    1600, // Level 9
    2000, // Level 10
    2400, // Level 11
    2800, // Level 12
    3200 // Level 13
];


  
  export const getLevel = (xp) => {
    let level = 1;
    for (let i = 0; i < levelXP.length; i++) {
      if (xp < levelXP[i]) {
        break;
      }
      level = i + 1;
    }
    return level;
  };
  
  export default levelXP;
  