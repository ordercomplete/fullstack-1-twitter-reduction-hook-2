import { useState, useEffect } from "react";

import Page from "./component/page";
import PostList from "./container/post-list";
import Grid from "./component/grid";
import Box from "./component/box";

// function App() {
// example 1 =====================
// const [isHidden, setHidden] = useState(null);
// useEffect(() => {
//   setTimeout(() => setHidden(true), 5000);
// }, []);
// return <Page>{isHidden !== true && <PostList />}</Page>;
// example 2 =====================
// const [count, setCount] = useState(0);
// useEffect(() => {
//   setCount(count + 1);
// });
// original
// return (
//   <Page>
//     <PostList />
//   </Page>
// );
// }

// example 4 =====================
function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Помилка отримання геолокації:", error.message);
        }
      );
    } else {
      console.еггог("Геолокація не підтримується в цьому браузері.");
    }
  }, []);

  return (
    <Page>
      <Grid>
        <Box>
          {location ? (
            <div>
              <h2>Baшa геолокація:</h2>
              <p>Широта: {location.latitude}</p>
              <p>Довгота: {location.longitude}</p>
            </div>
          ) : (
            <p>Отримання геолокації...</p>
          )}
        </Box>
        <PostList />
      </Grid>
    </Page>
  );
}

// example 3 створено файл useWindowListener та перенесено туди =====================
// export function useWindowListener(eventType, listener) {
//   useEffect(() => {
//     window.addEventListener(eventType, listener);
//     return () => {
//       window.removeEventListener(eventType, listener);
//     };
//   }, [eventType, listener]);
// }

export default App;
