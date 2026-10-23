<img src="assets/icon.svg" width="64" height="64" alt="">

# arc-alts-comparison

Created in [T3 Code](https://t3.codes).

Feature comparison of Arc browser alternatives, live at [arc-alts-comparison.vercel.app](https://arc-alts-comparison.vercel.app).

Made by Erik Slovák ([GitHub](https://github.com/effektsvk), [Twitter](https://x.com/effektsvk)).

```sh
npm install
npm run dev
```

All data lives in [`src/data/comparison.ts`](src/data/comparison.ts) — add browsers (columns), categories (tables) and features (rows) there; the page renders whatever is in that file.

Every push to `main` is deployed to Vercel automatically through its Git integration.

## Contributing

Contributions are welcome! If you've tested one of these browsers (or another Arc alternative) and found something missing or wrong, open an issue or a pull request — most changes are just an edit to `src/data/comparison.ts`.
