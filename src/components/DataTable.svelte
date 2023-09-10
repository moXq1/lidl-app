<script lang="ts">
  import { addressData } from "../store";
</script>

<div>
  <h3>Константы</h3>
  <ul>
    <li>
      <p>Свет цена:</p>
      <span>{$addressData.electricityPrice}</span>
    </li>
    <li>
      <p>Вода цена:</p>
      <span>{$addressData.waterPrice}</span>
    </li>
    <li>
      <p>Газ цена:</p>
      <span>{$addressData.gasPrice}</span>
    </li>
    <li>
      <p>Распределение газ:</p>
      <span>{$addressData.gasRaspred}</span>
    </li>
    <li>
      <p>Мусор:</p>
      <span>{$addressData.garbage}</span>
    </li>
    <li>
      <p>Абонплата:</p>
      <span>{$addressData.abonplata}</span>
    </li>
    <li>
      <p>Отопление:</p>
      <span>{$addressData.heating}</span>
    </li>
    <li>
      <p>Домофон:</p>
      <span>{$addressData.intercom}</span>
    </li>
    <li>
      <p>Интернет:</p>
      <span>{$addressData.internet}</span>
    </li>
    <li>
      <p>Квартплата:</p>
      <span>{$addressData.kvartplata}</span>
    </li>
  </ul>
</div>

<style>
  div {
    margin-block: 2rem;
    background-color: white;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 13px;
  }

  ul {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    list-style: none;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.5rem;
    padding: 5px 20px;
    background-color: var(--forms);
    border-radius: 2rem;
    font-weight: 500;
  }
</style>
