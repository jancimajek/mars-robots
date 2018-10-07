export const isOffMap = (x, y) => state => x < 0 || y < 0 || x > state.map.x || y > state.map.y;
