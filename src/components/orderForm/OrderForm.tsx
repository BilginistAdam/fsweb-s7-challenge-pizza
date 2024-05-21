import React, { useEffect, useState } from "react";
import "./orderForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const OrderForm = ({ setOrder }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    size: "",
    dough: "",
    toppings: [],
    note: "",
    name: "",
  });
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const toppingsOptions = [
    "Pepperoni",
    "Tavuk Izgara",
    "Mısır",
    "Sarımsak",
    "Ananas",
    "Sosis",
    "Soğan",
    "Sucuk",
    "Biber",
    "Kabak",
    "Kanada Jambonu",
    "Domates",
    "Jalepeno",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToppingChange = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => {
      const newToppings = prevFormData.toppings.includes(value)
        ? prevFormData.toppings.filter((topping) => topping !== value)
        : [...prevFormData.toppings, value];
      return { ...prevFormData, toppings: newToppings };
    });
  };
  const totalToppingPrice = formData.toppings.length * 5;
  useEffect(() => {
    const newTotalPrice = (totalToppingPrice + 85.5) * count;
    setTotal(newTotalPrice.toFixed(2));
  }, [formData.toppings, count]);

  const handleSubmit = (e) => {
    const finallyOrder = {
      ...formData,
      count,
      total,
    };
    e.preventDefault();
    axios
      .post("https://reqres.in/api/pizza", finallyOrder)
      .then((response) => {
        setOrder(finallyOrder);
        navigate("/success");
      })
      .catch((error) => {
        console.error("Sipariş Gönderim Hatası:", error);
      });
  };

  return (
    <div>
      <form className="form-component" onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="S"
              checked={formData.size === "S"}
              name="size"
              onChange={handleInputChange}
            />
            S
          </label>
          <label>
            <input
              type="radio"
              value="M"
              checked={formData.size === "M"}
              name="size"
              onChange={handleInputChange}
            />
            M
          </label>
          <label>
            <input
              type="radio"
              value="L"
              checked={formData.size === "L"}
              name="size"
              onChange={handleInputChange}
            />
            L
          </label>
        </div>
        <select
          name="dough"
          value={formData.dough}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Hamur Kalınlığı Seç
          </option>
          <option value="İnce Hamur">İnce Hamur</option>
          <option value="Orta Hamur">Orta Hamur</option>
          <option value="Kalın Hamur">Kalın Hamur</option>
          <option value="Ekstra Kalınlıkta Hamur">
            Ekstra Kalınlıkta Hamur
          </option>
        </select>
        <div>
          {toppingsOptions.map((topping) => (
            <label key={topping}>
              <input
                type="checkbox"
                value={topping}
                checked={formData.toppings.includes(topping)}
                onChange={handleToppingChange}
              />
              {topping}
            </label>
          ))}
        </div>
        <div>
          <p>İsim Bilginizi Giriniz</p>
          <label>
            <input
              type="text"
              name="name"
              placeholder="İsim bilginizi giriniz"
              value={formData.name}
              onChange={handleInputChange}
            ></input>
          </label>
          <p>Sipariş Notu</p>
          <label>
            <textarea
              name="note"
              placeholder="Siparişe Eklemek istediğiniz bir not var mı"
              value={formData.note}
              onChange={handleInputChange}
            ></textarea>
          </label>
        </div>
        <button type="button" onClick={increase}>
          +
        </button>
        <p>{count}</p>
        <button type="button" onClick={decrease}>
          -
        </button>
        <button type="submit">Sipariş Ver</button>
      </form>
      <div>
        <p>Sipariş Toplamı</p>
        <p>
          Seçimler: {formData.toppings.join(", ")},{totalToppingPrice}
        </p>
        <p>Toplam: {total} TL</p>
      </div>
    </div>
  );
};
