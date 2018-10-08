export const hasScent = (x, y) => state => state.scents && state.scents[x] && state.scents[x][y];
export const isOffMap = (x, y) => state => x < 0 || y < 0 || x > state.map.x || y > state.map.y;
