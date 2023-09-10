<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let prevGas: number;
  export let currGas: number;
  export let distinctionGas: number;
  export let totalGas: number;
  export let prevWater: number;
  export let currWater: number;
  export let distinctionWater: number;
  export let totalWater: number;
  export let prevElec: number;
  export let currElec: number;
  export let distinctionElec: number;
  export let totalElec: number;
  export let total: number;
  export let handleSubmit: () => void;
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <h3>Вода</h3>
    <div class="calc">
      {#if currWater < prevWater}
        <span class="danger">
          Текущие значение должно быть больше предыдущего</span
        >
      {/if}

      <div>
        <label for="">Текущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={currWater}
          type="number"
        />
      </div>
      <div>
        <label for="">Предыдущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={prevWater}
          type="number"
        />
      </div>
      <div>
        <label for="">Разница</label>
        <input
          step="0.01"
          bind:value={distinctionWater}
          disabled
          type="number"
        />
      </div>
      <div>
        <label for="">Результат</label>
        <input step="0.01" bind:value={totalWater} disabled type="number" />
      </div>
    </div>
  </div>
  <div>
    <h3>Газ</h3>
    <div class="calc">
      {#if currGas < prevGas}
        <span class="danger">
          Текущие значение должно быть больше предыдущего</span
        >
      {/if}
      <div>
        <label for="">Текущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={currGas}
          type="number"
        />
      </div>
      <div>
        <label for="">Предыдущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={prevGas}
          type="number"
        />
      </div>
      <div>
        <label for="">Разница</label>
        <input step="0.01" bind:value={distinctionGas} disabled type="number" />
      </div>
      <div>
        <label for="">Результат</label>
        <input step="0.01" bind:value={totalGas} disabled type="number" />
      </div>
    </div>
  </div>
  <div>
    <h3>Электричество</h3>
    <div class="calc">
      {#if currElec < prevElec}
        <span class="danger">
          Текущие значение должно быть больше предыдущего</span
        >
      {/if}
      <div>
        <label for="">Текущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={currElec}
          type="number"
        />
      </div>
      <div>
        <label for="">Предыдущие</label>
        <input
          step="0.01"
          required
          min="0"
          bind:value={prevElec}
          type="number"
        />
      </div>
      <div>
        <label for="">Разница</label>
        <input
          step="0.01"
          bind:value={distinctionElec}
          disabled
          type="number"
        />
      </div>
      <div>
        <label for="">Результат</label>
        <input step="0.01" bind:value={totalElec} disabled type="number" />
      </div>
    </div>
  </div>
  <div class="total">
    <h3>Стоимость всего : {total}</h3>
  </div>

  <div class="settings">
    <button>Создать</button>
    <button
      on:click={() => {
        goto(`/address/${$page.params.addressID}`);
      }}
      type="button">Отмена</button
    >
  </div>
</form>

<style>
  .settings {
    margin-block: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .total {
    margin-block: 2rem;
  }

  h3 {
    margin-block-start: 2rem;
  }

  .settings button {
    background-color: var(--primary-color);

    transition: all 0.2s ease;

    padding: 1em 2em;

    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }

  .settings button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--primary-color);
  }
  .settings button[type="button"]:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--danger);
  }

  button[type="button"] {
    background-color: var(--danger);
    color: white;
  }

  form {
    padding: 1rem 2rem;
    background-color: white;
    border-radius: 13px;
    margin-block: 2rem;
  }

  .calc {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr min-content;
    gap: 1rem;
    margin-block-end: 1rem;
  }

  .danger {
    color: var(--danger);
    grid-column: 1/-1;
  }

  input {
    width: 100%;
    background-color: white;
    padding: 0.5rem 1rem;
    border: 2px solid black;
    font-weight: 500;
    border-radius: 7px;
  }

  input:disabled {
    background-color: var(--forms);
  }

  @media screen and (max-width: 601px) {
    .calc {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 0.5rem;
    }
    input {
      width: 80%;
    }
  }

  @media screen and (max-width: 350px) {
    .settings {
      flex-direction: column;
    }
  }
</style>
