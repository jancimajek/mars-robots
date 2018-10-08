export const headings = {
  N: 0, E: 90, S: 180, W: 270,
};
export const orientations = Object.keys(headings).reduce((a, heading) => ({
  ...a,
  [headings[heading]]: heading,
}), {});
export const getOrientation = heading => headings[heading];
export const getHeading = orientation => orientations[orientation];
