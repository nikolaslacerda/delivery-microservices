export class DayOfWeekUtils {

  static dayOfWeek = [
    { name: 'Monday', id: 1},
    { name: 'Tuesday', id: 2},
    { name: 'Wednesday', id: 3},
    { name: 'Thursday', id: 4},
    { name: 'Friday', id: 5},
    { name: 'Saturday', id: 6},
    { name: 'Sunday', id: 7},
  ];

  public static findValue(name: string) {
    return this.dayOfWeek.find(dayOfWeek => dayOfWeek.name.toLowerCase() === name.toLowerCase());
  }

  public static compare(name1: string, name2: string) {
    return  this.findValue(name1).id - this.findValue(name2).id;
  }

}
