// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { Post } = require('../class/post')

router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body
    if (!username || !text) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення поста',
      })
    }

    let post = null
    console.log(postId, 'postId')

    if (postId) {
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        return res
          .status(400)
          .json({ message: 'Пост з таким ID не існує' })
      }
    }

    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()
    if (list.length === 0) {
      return res.status(200).json({ list: [] })
    }
    return res.status(200).json({
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        message: 'Потрібно передати ID поста',
      })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res
        .status(400)
        .json({ message: 'Пост з таким ID не існує' })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        text: post.text,
        username: post.username,
        date: post.date,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          text: reply.text,
          username: reply.username,
          date: reply.date,
        })),
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

// Експортуємо глобальний роутер
module.exports = router

// Детальний опис класу `Post` та його методів:
// #### Властивості та методи класу `Post`
// 1. **`#list` та `#count`**:
//    - **Тип**: Приватні статичні властивості.
//    - **Опис**: `#list` використовується для зберігання списку усіх створених постів, а `#count` використовується для створення унікальних ідентифікаторів постів.

// 2. **Конструктор `constructor(username, text)`**:
//    - **Параметри**: `username` - ім'я користувача, `text` - текст посту.
//    - **Дії**: Створює об'єкт посту з унікальним ідентифікатором, ім'ям користувача, текстом посту, датою створення та пустим списком відповідей.

// 3. **Статичний метод `create(username, text, post)`**:
//    - **Параметри**: `username` - ім'я користувача, `text` - текст посту, `post` - опціональний параметр для відповідей на вже існуючий пост.
//    - **Дії**: Створює новий пост з вказаним користувачем і текстом. Якщо є пост для відповідей, додає новий пост до списку відповідей цього посту; в іншому випадку, додає цей пост до загального списку. Також виводить у консоль список усіх постів після створення.

// 4. **Статичний метод `getById(id)`**:
//    - **Параметр**: `id` - ідентифікатор посту, який шукається.
//    - **Дії**: Повертає об'єкт посту, який має вказаний ідентифікатор, або `null`, якщо пост не знайдено.

// 5. **Статичний метод `getList()`**:
//    - **Дії**: Повертає список усіх створених постів.

// #### Експорт класу
// 6. **Експорт класу `Post`**:
//    - **Дії**: Експортує клас `Post` для використання в інших частинах програми.

// Цей клас `Post` відповідає за створення, управління та відображення постів у системі. Він має можливість створення нових постів відповідно до вхідних даних, відображення посту за його ідентифікатором та отримання списку усіх створених постів. Клас використовує приватні властивості для зберігання списку постів та лічильника генерації унікальних ідентифікаторів.
