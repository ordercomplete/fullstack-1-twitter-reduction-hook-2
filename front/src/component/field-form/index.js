import { useState } from "react";
import "./index.css";

export default function Component({ placeholder, button, onSubmit }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = () => {
    if (value.length === 0) return null;

    if (onSubmit) {
      onSubmit(value);
    } else {
      throw new Error("onSubmit props is undefiend");
    }

    setValue("");
  };
  const isDisabled = value.length === 0;

  return (
    <div className="field-form">
      <textarea
        onChange={handleChange}
        value={value}
        rows={2}
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
}

// ### Детальний опис подій, функцій, методів та властивостей в компоненті

// #### Використані бібліотеки та модулі
// 1. **`react`**: Використовується для створення компонентів на React.

// #### Стан та функції:
// 1. **`value`**:
//    - **Тип**: State   - **Опис**: Значення, що зберігається в текстовому полі.

// 2. **`setValue()`**:
//    - **Тип**: Функція
//    - **Опис**: Встановлює значення в стані `value` на основі поданого події зміни у текстовому полі.

// 3. **`handleChange()`**:
//    - **Тип**: Функція
//    - **Опис**: Викликає `setValue()` при зміні значення у текстовому полі.

// 4. **`handleSubmit()`**:
//    - **Тип**: Функція
//    - **Опис**: Перевіряє довжину введеного значення. Якщо значення не пусте, викликає `onSubmit` з поданим значенням. Якщо `onSubmit` не визначено, викидає помилку "onSubmit props is undefined". Після цього обнуляє значення у текстовому полі.

// 5. **`isDisabled`**:
//    - **Тип**: Змінна
//    - **Опис**: Містить `true`, якщо значення у текстовому полі порожнє.

// #### Візуальне відтворення:
// 1. **`<div>`**:
//    - **Клас**: "field-form"
//    - **Опис**: Обгортка для текстового поля та кнопки.

// 2. **`<textarea>`**:
//    - **Клас**: "field-form__field"
//    - **Опис**: Текстове поле для введення значення.
//    - **Властивості**: Значення, рядки та плейсхолдер передаються через пропси.

// 3. **`<button>`**:
//    - **Клас**: "field-form__button"
//    - **Опис**: Кнопка для відправки введеного значення.
//    - **Властивість `disabled`**: Забороняє взаємодію, якщо значення у текстоовму полі порожнє.
//    - **Властивість `onClick`**: Викликає `handleSubmit()` при натисканні.

// Даний компонент відображає поле для введення тексту та кнопку для відправки вмісту текстового поля. Компонент має зворотній зв'язок для відправки вмісту текстового поля до зовнішньої функції, яка надається через пропс `onSubmit`. Також, в компоненті реалізовано перевірку наявності введеного тексту перед відправленням, щоб уникнути відправлення пустого повідомлення.
