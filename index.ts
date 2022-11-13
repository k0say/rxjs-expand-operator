import {
  concatMap,
  distinctUntilChanged,
  EMPTY,
  filter,
  from,
  iif,
  interval,
  of,
  skip,
  Subject,
  tap,
  timer,
} from 'rxjs';
import { expand, map, take } from 'rxjs/operators';

function getPageData(index: number) {
  return timer(500).pipe(
    map(() => ({
      pageIndex: index,
      data: Array.from({ length: 10 }, (_, i) => ({
        id: index * 10 + 1,
        data: Math.random(),
      })),
      nextPageIndex: index < 10 ? index + 1 : undefined,
    }))
  );
}

// const requestIndex = new Subject<number>();

// const source = requestIndex.pipe(
//   concatMap((index) => getPageData(index)),

//   tap(
//     ({ nextPageIndex }) =>
//       nextPageIndex !== undefined && requestIndex.next(nextPageIndex)
//   )
// );

//source.subscribe(x => console.log(x));

// requestIndex.next(1);

of({ nextPageIndex: 0 }).pipe(
  expand(({ nextPageIndex }) => {
    return nextPageIndex !== undefined ? getPageData(nextPageIndex) : EMPTY;
  }),
  filter((data) => data.nextPageIndex !== undefined),
  distinctUntilChanged()
);
//.subscribe(console.log);

of(1).pipe(
  expand((n) => {
    return (n<10) ? of(n + 1): EMPTY
  })
).subscribe(console.log);
