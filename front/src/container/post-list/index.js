import { useState, Fragment, useEffect, useReducer } from "react";

import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";

import PostCreate from "../post-create";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

import PostItem from "../post-item";

import { useWindowListener } from "../../util/useWindowListener";

import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

export default function Container() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  const getData = async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
    try {
      const res = await fetch("http://localhost:4000/post-list");

      const data = await res.json();

      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: convertData(data),
        });
      } else {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  };

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: raw.list.length === 0,
  });

  useEffect(() => {
    getData();
  }, []);

  // example 3 =====================
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener("pointermove", (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  // example 4 =====================

  // if (status === null) {
  //   getData();
  // }

  return (
    <Grid>
      {/* example 3 start ===================== */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
      {/* example 3 end ===================== */}
      <Box>
        <Grid>
          <Title>Home</Title>
          <PostCreate
            onCreate={getData}
            placeholder="What is happening?!"
            button="Post"
          />
        </Grid>
      </Box>

      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <Fragment>
          <Box>
            <Skeleton />
          </Box>
          <Box>
            <Skeleton />
          </Box>
        </Fragment>
      )}

      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}

      {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
        <Fragment>
          {state.data.isEmpty ? (
            <Alert message="Список постів пустий" />
          ) : (
            state.data.list.map((item) => (
              <Fragment key={item.id}>
                <PostItem {...item} />
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  );
}

// Цей файл – це головний контейнер, який виводить список всіх дописів та форму створення нового допису.

// Основний функціонал:

// Здійснення запиту до серверу для отримання списку всіх дописів при завантаженні сторінки.
// Виведення списку всіх дописів за допомогою компонента 'PostItem'.
// Виклик методу отримання нового списку дописів після створення нового допису.
// Використовує власні hook для відстеження положення вказівника миші.
// Виведення компонентів завантаження та поля повідомлення про помилки.

// Цей файл використовує React, JavaScript ES6, та Fetch API:

// Використовує React Hook useReducer для зміни станів списку дописів, при цьому використовує свій власний reducer (requestReducer) та початковий стан (requestInitialState) з файлу 'request.js'.
// Функція getData: створює і виконує запит GET до серверу для отримання списку всіх дописів.
// Функція convertData: формує структуризований об'єкт з масиву з отриманого списку дописів.

// ### Опис подій, функцій, методів та властивостей

// #### 1. Стан та функції:
// 1. **status**:
//    - **Тип**: State
//    - **Опис**: Визначає статус операції: `null`, `LOAD_STATUS.PROGRESS`, `LOAD_STATUS.SUCCESS`, або `LOAD_STATUS.ERROR`.

// 2. **message**:
//    - **Тип**: State
//    - **Опис**: Повідомлення про помилки під час операцій.

// 3. **data**:
//    - **Тип**: State
//    - **Опис**: Дані про пости, отримані з сервера.

// 4. **getData()**:
//    - **Тип**: Функція
//    - **Дії**: Виконує запит на сервер для отримання списку постів. Обробляє отримані дані та встановлює відповідний статус.

// 5. **convertData()**:
//    - **Тип**: Функція
//    - **Дії**: Конвертує вхідні дані у відповідний формат через обернене сортування та додавання дати до постів.

// #### 2. Компоненти та візуальне відтворення:
// 1. **Відображення заголовку та форми створення поста**:
//    - Заголовок відображається за допомогою компонента `Title`.
//    - Форма для створення посту виводиться через `PostCreate`.

// 2. **Відображення постів**:
//    - Виведення списку постів після завантаження.
//    - Відображення індикатора завантаження (`Skeleton`) під час процесу завантаження.

// 3. **Відображення повідомлень про помилки**:
//    - Виведення повідомлення при помилці під час отримання даних.

// #### Загальний опис:
// Файл `Container.js` містить реалізацію компонента, який відображає домашню сторінку з можливістю створення постів та перегляду списку існуючих постів. Компонент взаємодіє з сервером для отримання та відображення інформації. Під час завантаження показується індикатор завантаження, а також можливі повідомлення про помилки.
