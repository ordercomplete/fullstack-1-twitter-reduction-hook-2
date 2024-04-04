// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./normalize.css";
import "./index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// Хуки - це функції, що дозволяють вам "підключитися" до стану та методів життєвого циклу у функціональних компонентах.

// У цьому проекті використовуються наступні хуки React:

// 1. **useState:** Ця технологія дозволяє додавати стан в функціональні компоненти. У вихідному коді ви можете побачити, що її використовують для визначення та зміни стану, наприклад у файлі 'post-list' і 'post-item' для керування відображенням вкладеного списку дописів.

// ```javascript
// const [isOpen, setOpen] = useState(false);
// ```

// 2. **useEffect:** Ця технологія дозволяє добавляти ефекти в компоненти React, які замінюють методи життєвого циклу `componentDidMount`, `componentDidUpdate`, і `componentWillUnmount`. Приміром використовується для виконання side-ефектів після рендера, такі як виконання запиту GET до серверу для отримання списку всіх дописів у файлі 'post-list':

// ```javascript
// useEffect(() => {
//     getData();
//   }, []);
// ```

// 3. **useReducer:** Ця технологія дозволяє виконувати керування складнішего стану за допомогою редуктора (функції, що визначає, як стан має змінитися). У ваших файлах це використовують для визначення та роботи зі станами запитів:

// ```javascript
// const [state, dispatch] = useReducer(requestReducer, requestInitialState);
// ```

// У цьому випадку `state` - це поточний стан запиту, `requestReducer` - це функція редуктор, а `requestInitialState` - це початковий стан запиту.

// 4. **useWindowListener:** Цей хук, визначений у файлі 'post-list', є прикладом визначеного користувачем хука для перехвату та обробки подій вікна браузера. У такому випадку вони слухають подію "pointermove" та визначають позицію курсору миші.

// ```javascript
// useWindowListener("pointermove", (e) => {
//   setPosition({ x: e.clientX, y: e.clientY });
// });
// ```
// У цьому випадку `setPosition` - це функція встановлення стану, яку виділено з `useState` для зберігання позиції вказівника миші. Для подій вікна `pointermove` вони визначають нову позицію вказівника миші за допомогою об'єкта події, який передається у функцію `setPosition`.
