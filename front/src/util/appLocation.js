// import { useState, useEffect } from "react";

// export function useWindowListener(eventType, listener) {
//   useEffect(() => {
//     window.addEventListener(eventType, listener);
//     return () => {
//       window.removeEventListener(eventType, listener);
//     };
//   }, [eventType, listener]);
// }

// export function appLocation() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error("Помилка отримання геолокації:", error.message);
//         }
//       );
//     } else {
//       console.еггог("Геолокація не підтримується в цьому браузері.");
//     }
//   }, []);

// return (
//   <Page>
//     {location ? (
//       <div>
//         <h2>Baшa геолокація:</h2>
//         <p>Широта: {location.latitude}</p>
//         <p>Довгота: {location.longitude}</p>
//       </div>
//     ) : (
//       <p>Отримання геолокації...</p>
//     )}
//     {/* <PostList /> */}
//   </Page>
// );
// }
