import { useState, Fragment, useEffect } from "react";

import Grid from "../../component/grid";
import Box from "../../component/box";

import PostCreate from "../post-create";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";

import PostContent from "../../component/post-content";

export default function Container({ id, username, text, date }) {
  const [data, setData] = useState({
    id,
    username,
    text,
    date,
    reply: null,
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch(`http://localhost:4000/post-item?id=${data.id}`);
      const resData = await res.json();
      if (res.ok) {
        setData(convertData(resData));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(resData.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = ({ post }) => ({
    id: post.id,
    username: post.username,
    text: post.text,
    date: getDate(post.date),

    reply: post.reply.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: post.reply.length === 0,
  });

  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    // if (status === null) {
    //   getData();
    // }
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen === true) {
      getData();
    }
  }, [isOpen]);

  return (
    <Box style={{ padding: "0" }}>
      <div
        style={{
          padding: "20px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <PostContent
          username={data.username}
          date={data.date}
          text={data.text}
        />
      </div>

      {isOpen && (
        <div style={{ padding: "0 20px 20px 20px" }}>
          <Grid>
            <Box className="post-item__inside-box">
              <PostCreate
                placeholder="Post your reply!"
                button="Reply"
                id={data.id}
                onCreate={getData}
              />
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

            {status === LOAD_STATUS.SUCCESS &&
              data.isEmpty === false &&
              data.reply.map((item) => (
                <Fragment key={item.id}>
                  <Box>
                    <PostContent {...item} />
                  </Box>
                </Fragment>
              ))}
          </Grid>
        </div>
      )}
    </Box>
  );
}

// ### Детальний опис подій, функцій, методів та властивостей у файлі

// #### 1. Стан та функції:
// 1. **data**
//    - **Тип**: State
//    - **Опис**: Об’єкт, що містить дані про пост та його відповіді.
//    - **Початкове значення**: Об'єкт з властивостями `id`, `username`, `text`, `date`, та `reply` (значення початково `null`).

// 2. **status**
//    - **Тип**: State
//    - **Опис**: Визначає статус запиту: `null`, `LOAD_STATUS.PROGRESS`, `LOAD_STATUS.SUCCESS`, або `LOAD_STATUS.ERROR`.

// 3. **message**
//    - **Тип**: State
//    - **Опис**: Повідомлення про помилку або статус операції.

// 4. **getData()**
//    - **Тип**: Функція
//    - **Дії**: Виконує запит на сервер для отримання даних про пост та його відповідей. При успішному запиті оновлює `data` та `status`, в іншому випадку встановлює повідомлення про помилку та статус `LOAD_STATUS.ERROR`.

// 5. **convertData()**
//    - **Тип**: Функція
//    - **Дії**: Конвертує дані про пост та його відповіді у відповідний формат.

// 6. **isOpen**
//    - **Тип**: State
//    - **Опис**: Визначає, чи відкрито вікно з відповідями на пост.

// 7. **handleOpen()**
//    - **Тип**: Функція
//    - **Дії**: Обробляє відкриття або закриття вікна з відповідями, викликаючи `getData`, якщо `status` є `null`.

// #### Компоненти і візуальне відображення:
// 1. **Відображення посту**:
//    - Реалізоване через компонент `PostContent` та блочний елемент.
//    - Відкриття посту та виведення відповідей здійснюється через обр облюючи клік на `div` обгортці посту.

// 2. **Відображення відповідей**:
//    - Виведення відповідей та відображення форми для їх створення реалізовані через компонент `PostCreate`.
//    - Відображення індикатора завантаження (`Skeleton`) увипадку процесу завантаження.

// 3. **Alert**:
//    - Відображенна у випадку помилки під час запиту до сервера.

// ### Загальний опис:
// Файл `Container.js` містить реалізацію функціонально компонента відображення посту та його відповідей, обробку стану та подій під час змін стану, отримання даних з сервера та їх вівдення. Компонент відображує пост разом з відповідями, обробляючи статуси операцій та перехід між режимами відображення.
