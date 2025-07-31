const fluEvent = {
  title: 'Ailment',
  description: 'You have caught the flu. You need to rest and recover.',
  cost: {
    health: -10,
    happiness: -5,
    intelligence: 0,
    appearance: 0,
  },
};

const axietyEvent = {
  title: 'Anxiety',
  description: 'You are feeling anxious. You need to take a break.',
  cost: {
    health: -5,
    happiness: -5,
    intelligence: -5,
    appearance: 0,
  },
};

export const deadEvent ={
    title: 'Death',
    description: 'You have died.',
    cost: {
      health: -100,
      happiness: -100,
      intelligence: -100,
      appearance: -100,
    },
  };


// const fatherDeadEvent = {
//   title: 'Death',
//   description: 'Your father has died.',
//   description2: 'You must now take care of your family.',
//   cost: {
//     health: -20,
//     happiness: -40,
//     intelligence: 0,
//     appearance: 0,
//   },
// };

export const petDeadEvent = {
  title: 'Death',
  description: 'Your pet has died.',
  description2: "Your pet's passing brings deep sorrow as you remember the joy it brought into your life.",
  cost: {
    health: -20,
    happiness: -40,
    intelligence: 0,
    appearance: 0,
  },
}

// const motherDeadEvent = {
//   title: 'Death',
//   description: 'Your mother has died.',
//   description2: 'You must now take care of your family.',
//   cost: {
//     health: -20,
//     happiness: -40,
//     intelligence: 0,
//     appearance: 0,
//   },
// };
const vacationEvent = {
  title: 'Vacation',
  description: 'You are going on vacation to relax and unwind.',
  description2: 'You feel excited and rejuvenated as you explore new destinations.',
  cost: {
    health: 10,
    happiness: 20,
    intelligence: 0,
    appearance: 0,
  },
};
const carAccidentEvent = {
  title: 'Car Accident',
  description: 'You have been involved in a car accident.',
  description2: 'You feel shaken and in need of medical attention.',
  cost: {
    health: -20,
    happiness: -10,
    intelligence: 0,
    appearance: 0,
  },
};

const lotteryWinEvent = {
  title: 'Lottery Win',
  description: 'You have won the lottery jackpot.',
  description2: 'You feel ecstatic and overwhelmed by the sudden windfall.',
  cost: {
    health: 0,
    happiness: 50,
    intelligence: 0,
    appearance: 0,
  },
};

const homePurchaseEvent = {
  title: 'Home Purchase',
  description: 'You have purchased a new home.',
  description2: 'You feel proud and excited about this significant milestone in your life.',
  cost: {
    health: -10,
    happiness: 30,
    intelligence: 0,
    appearance: 0,
  },
};

const newFriendEvent = {
  title: 'New Friend',
  description: 'You have made a new friend.',
  description2: 'You feel happy and excited about the new connection.',
  cost: {
    health: 0,
    happiness: 15,
    intelligence: 0,
    appearance: 0,
  },
};
const graduationEvent = () => {
  return {
    title: 'Graduation',
    description: 'You have graduated from school.',
    description2: 'You can now apply to university.',
    cost: {
      health: 0,
      happiness: 10,
      intelligence: 20,
      appearance: 0,
    },
  };
};

// export const motherDisapoitedEvent = () => {
//   return {
//     title: 'Disapointment',
//     description: 'Your mother is disapointed in you.',
//     cost: {
//       health: -20,
//       happiness: -20,
//       intelligence: 0,
//       appearance: 0,
//     },
//   };
// };

// const employmentEvent = () => {
//   return {
//     title: 'Employment',
//     description:
//       "Your mother sits you down and ask you're considered getting a job.",
//     description2: 'What will you do?',
//     action1: {
//       title: 'Browse available jobs',
//       action: () => {
//         console.log('Get a job');
//       },
//     },
//     action2: {
//       title: 'Argue with him',
//       action: () => {
//         console.log('Get a job');
//       },
//       consiquencesEvent: motherDisapoitedEvent(),
//     },
//   };
// };

// const fightBackEvent = () => {
//   return {
//     title: 'Fight back',
//     description: 'You have fought back against a bully.',
//     cost: {
//       health: -10,
//       happiness: 10,
//       intelligence: 0,
//       appearance: 0,
//     },
//   };
// };

// const ignoreBullyEvent = () => {
//   return {
//     title: 'Ignore',
//     description: 'You have ignored a bully.',
//     cost: {
//       health: 0,
//       happiness: -5,
//       intelligence: 0,
//       appearance: 0,
//     },
//   };
// };

// const tellTeacherEvent = () => {
//   return {
//     title: 'Tell teacher',
//     description: 'You have told a teacher about a bully.',
//     cost: {
//       health: 0,
//       happiness: 5,
//       intelligence: 0,
//       appearance: 0,
//     },
//   };
// };

// const bullyEvent = () => {
//   return {
//     title: 'Bully',
//     description: 'You are being bullied at school.',
//     description2: 'What will you do?',
//     action1: {
//       title: 'Fight back',
//       action: () => {
//         console.log('Fight back');
//       },
//       consiquencesEvent: fightBackEvent(),
//     },
//     action2: {
//       title: 'Tell a teacher',
//       action: () => {
//         console.log('Tell a teacher');
//       },
//       consiquencesEvent: tellTeacherEvent(),
//     },
//     action3: {
//       title: 'Ignore',
//       action: () => {
//         console.log('Ignore');
//       },
//       consiquencesEvent: ignoreBullyEvent(),
//     },
//   };
// };

// const acceptDateEvent = () => {
//   return {
//     title: 'Date',
//     description: 'You have accepted a date.',
//     cost: {
//       health: 0,
//       happiness: 30,
//       intelligence: 0,
//       appearance: 10,
//     },
//   };
// };

// const loveEvent = () => {
//   return {
//     title: 'Love',
//     description: 'You have fallen in love.',
//     interactPerson: {
//       name: 'Alice',
//       position: 'Girlfriend',
//       relationship: 100,
//       age: 20,
//       job: 'Student',
//       degree: 'High School',
//     },
//     action1: {
//       title: 'Ask her on a date',
//       action: () => {
//         console.log('Ask her on a date');
//       },
//       consiquencesEvent: acceptDateEvent(),
//     },
//     action2: {
//       title: "No, She's not my type",
//       action: () => {
//         console.log("No, She's not my type");
//       },
//     },
//   };
// };

export const EventList = [
  fluEvent,
  axietyEvent,
  petDeadEvent,
  vacationEvent,
  carAccidentEvent,
  lotteryWinEvent,
  homePurchaseEvent,
  newFriendEvent,
  0,
  0,
  0,
  0,
  0
];
