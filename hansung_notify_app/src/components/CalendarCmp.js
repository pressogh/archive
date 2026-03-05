import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Agenda} from 'react-native-calendars';

const CalendarCmp = ({route, calendardata, day}) => {
  const [tomark, setTomark] = useState([]);
  const [calendaritem, setCalendaritem] = useState([]);
  const [agendaitem, setAgendaitem] = useState([]);

  useEffect(() => {
    let calendar = {};
    for (let i = 0; i < day.length; i++) {
      let dotstemp = [];
      for (let j = 0; j < calendardata[day[i]].length; j++) {
        let temp =
          route.params.classcolor[calendardata[day[i]][j]['class_name']];
        dotstemp.push(temp);
      }
      calendar[day[i]] = {dots: dotstemp};
    }
    setTomark(calendar);

    let calendaritem = {};
    for (let i = 0; i < day.length; i++) {
      let daystemp = [];
      let temp = {};
      for (let j = 0; j < calendardata[day[i]].length; j++) {
        temp['class_name'] = calendardata[day[i]][j]['class_name'];
        temp['title'] = calendardata[day[i]][j]['title'];
        temp['due_date'] = calendardata[day[i]][j]['due_date'];
        daystemp.push(temp);
      }
      calendaritem[day[i]] = daystemp;
    }
    setAgendaitem(calendaritem);
  }, []);

  return (
    <Agenda
      items={agendaitem}
      renderItem={(item, firstItemInDay) => {
        return (
          <View style={styles.card}>
            <Text style={styles.title}>{item.class_name}</Text>
            <Text>{item.title}</Text>
            <Text>{item.due_date}</Text>
          </View>
        );
      }}
      selected={route.params.selected}
      markedDates={{...tomark}}
      markingType={'multi-dot'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },

  item: {
    padding: 5,
    flexDirection: 'row',
  },

  card: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 10,
  },

  title: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
    flex: 11,
  },
});

export default CalendarCmp;
