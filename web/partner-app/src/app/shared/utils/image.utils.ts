export const getImagePath = (restaurantId: Request, image: File) => {
  const a = Math.floor(Math.random() * (99999999 - 11111111)) + 11111111;
  return restaurantId + '_profile_' + a + '.' + image.name.substr(image.name.lastIndexOf('.') + 1);
};
