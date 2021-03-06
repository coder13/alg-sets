import { shrink } from './moves';

export const algImageUrl = alg => {
  const IMAGE_BASE_URL = 'http://cube.crider.co.uk/visualcube.php';
  const params = new URLSearchParams({
    fmt: 'svg',
    size: 150,
    bg: 't',
    pzl: 3,
    case: shrink(alg),
    sch: 'yrbwog',
    r: 'y34x-34'
  });
  return `${IMAGE_BASE_URL}?${params.toString()}`;
};

export const algAnimationUrl = alg => {
  const ANIMATION_BASE_URL = 'https://alg.cubing.net';
  const params = new URLSearchParams({ alg, type: 'alg' });
  return `${ANIMATION_BASE_URL}?${params.toString()}`;
};

export const preventDefault = fn => event => {
  event.preventDefault();
  fn();
};

export const pluralize = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : (plural || singular + 's')}`
