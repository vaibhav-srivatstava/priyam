// Edit this file to personalise the invitation. Everything on the page reads from here.

export const wedding = {
  partner1: "Priyam",
  partner2: "Shilpi",

  // Shown on the opening screen and above the names. Set to "" to hide it.
  greeting: "शुभ विवाह",

  inviteTop: "Together with their families",
  inviteBottom: "invite you to celebrate their wedding",

  // ISO date with time zone offset. Drives the countdown.
  date: "2026-11-24T18:00:00+05:30",
  displayDate: "Tuesday, 24 November 2026",

  venue: {
    name: "The Grand Utsav Hotel",
    city: "Jaunpur",
    address: "Utsav Motel Wazidpur Tiraha, Jaunpur - 222002 (U.P.)",
    note: "Festive traditional attire is warmly encouraged.",
  },

  // `color` is the dot on the timeline. Pick a colour that suits each function.
  events: [
    // {
    //   day: "11",
    //   month: "Feb",
    //   title: "Mehndi",
    //   time: "4:00 pm",
    //   place: "Courtyard lawn",
    //   note: "Henna artists, chai and music. Come ready to be painted.",
    //   color: "#3f7d3a",
    // },
    {
      day: "23",
      month: "Nov",
      title: "Haldi",
      time: "11:00 am",
      place: "Utsav Motel",
      note: "Wear something yellow and something you don't mind staining.",
      color: "#f4a300",
    },
    {
      day: "23",
      month: "Nov",
      title: "Sangeet",
      time: "7:00 pm",
      place: "Utsav Motel",
      note: "An evening of music and dancing, followed by dinner.",
      color: "#d2255f",
    },
    // {
    //   day: "14",
    //   month: "Feb",
    //   title: "Wedding ceremony",
    //   time: "6:00 pm",
    //   place: "The Grand Courtyard, garden",
    //   note: "Please be seated by 5:45 pm.",
    //   color: "#5e0f26",
    // },
    {
      day: "24",
      month: "Nov",
      title: "Reception",
      time: "8:30 pm",
      place: "Utsav Motel Wazidpur Tiraha, Jaunpur - 222002 (U.P.)",
      note: "Dinner and dancing to follow the ceremony.",
      color: "#0f5a55",
    },
  ],

  rsvpBy: "20 November 2026",

  contacts: [
    { name: "Priyam", phone: "+91 91400 53770" },
    { name: "Shivam", phone: "+91 91400 38098" },
  ],
};

export type Wedding = typeof wedding;
