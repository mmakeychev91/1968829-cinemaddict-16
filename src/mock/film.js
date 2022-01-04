//https://day.js.org/docs/en/display/format
import dayjs from 'dayjs';
import {getRandomInteger} from './../utilities.js';


//Функция по генерации случайного числа с округлением до десятых
const getRandomFloat = (min, max) => {
  const randomNumber = Math.random() * (max - min) + min;
  const finalNumber = Math.floor(randomNumber * 10) / 10;
  return finalNumber;
};

// генерируем название
const generateTitle = () => {
  const titles = [
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden arm',

  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};


// генерируем путь к файлу постера
const generatePoster = () => {
  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};
const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateReleaseDate = (format) => {
  const now = dayjs();
  const randomIndexForDay = getRandomInteger(0, -36500);
  if (format === 'full') {
    return now.add(randomIndexForDay, 'day').format('DD MMMM YYYY ');
  } else {
    return now.add(randomIndexForDay, 'day').format('YYYY ');
  }
};
const generateRuntime = () => {
  const h = getRandomInteger(1, 3);
  const m = getRandomInteger(1, 59);
  const hoursValue = `${h}h`;
  const minutesValue = `${m}m`;
  return `${hoursValue} ${minutesValue}`;
};
const generateDirectorName = () => {
  const directors = [
    'Woody Allen',
    'Robert Altman',
    'Ingmar Bergman',
    'Mel Brooks',
    'Tim Burton',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writers = [
    'Billy Wilder',
    'Ethan Coen',
    'Joel Coen',
    'Robert Towne',
    'Quentin Tarantino',
    'Francis Ford Coppola',
    'William Goldman',
  ];

  const n = getRandomInteger(1, 3);

  const shuffled = writers.sort(() => .5 - Math.random());

  const selected = shuffled.slice(0, n);
  return selected.join(', ');
};
const generateActors = () => {
  const actors = [
    'Jack Nicholson',
    'Marlon Brando',
    'Robert De Niro',
    'Al Pacino',
    'Daniel Day-Lewis',
    'Dustin Hoffman',
    'Tom Hanks',
    'Anthony Hopkins',
    'Penelope Cruz',
    'Sally Hawkins',
    'Helena Bonham Carter',
    'Octavia Spencer',
    'Rachel Weisz',
    'Naomi Watts',

  ];

  const n = getRandomInteger(3, 3);

  const shuffled = actors.sort(() => .5 - Math.random());

  const selected = shuffled.slice(0, n);
  return selected.join(', ');
};
const generateCountry = () => {
  const countries = [
    'Kenya',
    'USA',
    'Russia',
    'Poland',
    'Turkey',
    'Argentina',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};
const generateGenres = (genreQuantity) => {
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller',
  ];
  let n;
  if (genreQuantity === 'one') {
    n = 1;
  } else {
    n = 3;
  }
  const shuffled = genres.sort(() => .5 - Math.random());

  const selected = shuffled.slice(0, n);
  return selected;
};

const generateAgeRating = () => {
  const ageRating = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];

  const randomIndex = getRandomInteger(0, ageRating.length - 1);

  return ageRating[randomIndex];
};
//генерируем пояснения к фильму
const generateDiscription = () => {
  const n = getRandomInteger(1, 5);

  const shuffled = lorem.sort(() => .5 - Math.random());

  const selected = shuffled.slice(0, n);
  return selected;
};
const generateGenresInSpan = () => {
  const spanGenres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller',
  ];

  const shuffled = spanGenres.sort(() => .5 - Math.random());

  const selected = shuffled.slice(0, 3);
  return selected;
};
//создаем функцию, которая генерирует объекты с комментариями
export const generateComment = () => {
  //генерим путь к смайлу
  const generateEmoji = () => {
    const emoji = [
      './images/emoji/angry.png',
      './images/emoji/puke.png',
      './images/emoji/sleeping.png',
      './images/emoji/smile.png',
    ];
    const randomIndexForSmile = getRandomInteger(0, emoji.length - 1);
    return emoji[randomIndexForSmile];
  };
  //генерим дату
  const generateDate = () => {
    const now = dayjs();
    const randomIndexForDay = getRandomInteger(0, -365);

    return now.add(randomIndexForDay,'day').format('YYYY/MM/DD HH:mm');
  };
  //генерим автора
  const generateAuthor = () => {
    const authors = [
      'Kareem Abdul-Jabbar',
      'Ray Allen',
      'Giannis Antetokounmpo',
      'Carmelo Anthony',
      'Nate Archibald',
      'Paul Arizin',
      'Charles Barkley',
    ];
    const randomIndexForAuthor = getRandomInteger(0, authors.length - 1);
    return authors[randomIndexForAuthor];
  };
  //генерим сообщение
  const generateMessage = () => {
    const n = getRandomInteger(1,3);

    const shuffled = lorem.sort(()=> .5 - Math.random());

    const selected = shuffled.slice(0,n);
    return selected;
  };

  const comment = {
    emoji: generateEmoji(),
    date: generateDate(),
    author: generateAuthor(),
    message: generateMessage(),
  };
  return comment;
};


//генерируем карточку фильма
export const generateFilmCard = () => ({
  poster: generatePoster(),
  title: generateTitle(),
  originalTitle: generateTitle(),
  rating: getRandomFloat(0, 10),
  director: generateDirectorName(),
  writers: generateWriters(),
  actors: generateActors(),
  releaseDate: generateReleaseDate(),
  fullReleaseDate: generateReleaseDate('full'),
  runtime: generateRuntime(),
  genre: generateGenres('one'),
  genres: generateGenresInSpan(),
  //quantityCommentsPreview: generateComments(),
  //comment: generateComment(),
  //передавать сюда реальное количество комментариев из массива ключа выше
  //quantityComments: commentsValue.length,
  country: generateCountry(),
  description: generateDiscription(),
  ageRating: generateAgeRating(),
});
