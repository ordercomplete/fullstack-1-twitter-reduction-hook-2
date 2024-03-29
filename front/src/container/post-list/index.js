import { useState, Fragment, useEffect } from "react";

import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";

import PostCreate from "../post-create";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

import PostItem from "../post-item";

import { useWindowListener } from "../../util/useWindowListener";

import { appLocation } from "../../util/appLocation";

export default function Container() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch("http://localhost:4000/post-list");
      const data = await res.json();
      if (res.ok) {
        setData(convertData(data));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
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

    const intervalId = setInterval(() => getData(), 5000);

    // const intervalId = setInterval(() => alert(123), 5000);
    // alert(1);
    return () => {
      clearInterval(intervalId);
      // alert(2);
    };
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

      {status === LOAD_STATUS.PROGRESS && (
        <Fragment>
          <Box>
            <Skeleton />
          </Box>
          <Box>
            <Skeleton />
          </Box>
        </Fragment>
      )}

      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}

      {status === LOAD_STATUS.SUCCESS && (
        <Fragment>
          {data.isEmpty ? (
            <Alert message="Список постів пустий" />
          ) : (
            data.list.map((item) => (
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
