# 🤖 Mars robots

Solution to the *Mars robots* problem using Redux for state management. This may be a little bit unusual approach to the traditional object-oriented approach but I thought it'd be a fun challenge.

## 📲 Install
```bash
git clone https://github.com/jancimajek/mars-robots.git
cd mars-robots
yarn install
```

## ✅ Test
```bash
yarn test
```

or run all tests (in verbose mode) with coverage
```bash
yarn test:coverage
```

## ▶️ Run
```bash
yarn start
```

## 🏗 Develop

Run the app in watch mode with debugging on
```bash
yarn debug
```

Run all tests in watch mode
```bash
yarn test:watch
```

## 📖 Notes

### The Problem 
The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:
- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1)

There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### The Input 
The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output 
For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.

#### Sample Input
```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

#### Sample Output
```
1 1 E
3 3 N LOST
2 3 S
```


## 🔜 Todo / potential improvements

- Add more / improve existing validation
- Mock selectors for `moveRobotForward` tests
- Add more tests for `processInstructions`
- Add tests for input handling & parsing
- Refactor some of the test top use `it.each`
- Could break the reducers/actions into multiple features (probably too small now but I think some of the concerns can be probably separated in the future)
- Could be rewritten as part of front-end app (e.g. with React) to add GUI & user interactions - the state management should still work without much refactoring
- Could add more input handling methods
- Could add more robot instructions, e.g.
  - Move backwards
  - Make a U-turn
  - Rotate by a 45-degree angle to allow diagonal movement
- Scents are not directional, so if a robot gets lost by going north on top-left position, another robot would refuse to go east in the same position since it's already scented. However, in reality, the second robot should not have any previous knowledge that it's dangerous to go east.
- Improve the math when computing new position using sin/cos in degrees - at the moment the results are rounded to account for the floating point inaccuracy. It's OK now but might be an issue of more precise movement/rotation instructions are added in the future.