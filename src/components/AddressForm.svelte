<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import NumberInputError from "./NumberInputError.svelte";

  export let name = "";
  export let gasPrice = 0;
  export let waterPrice = 0;
  export let electricityPrice = 0;
  export let heating = 0;
  export let internet = 0;
  export let intercom = 0;
  export let gasRaspred = 0;
  export let abonplata = 0;
  export let garbage = 0;
  export let kvartplata = 0;

  let invalidName = false;

  const dispatch = createEventDispatcher();
  const submit = () => dispatch("submit");
</script>

<article class="address">
  <header>
    <h1><slot /></h1>
  </header>

  <form
    on:submit|preventDefault={() => {
      if (!name.trim().length) {
        invalidName = true;
        return;
      }

      submit();
    }}
  >
    <div class="grid">
      <div class="container">
        <label for="">Название</label>
        <input
          class:danger={invalidName}
          autocomplete="off"
          type="text"
          required
          minlength="3"
          maxlength="16"
          value={name}
          on:blur={(e) => {
            if (
              !e?.currentTarget?.value ||
              e?.currentTarget?.value.length < 3
            ) {
              invalidName = true;
            } else {
              invalidName = false;
            }
          }}
          on:input={(e) => {
            if (e?.currentTarget?.value.length >= 3) {
              invalidName = false;
            }
            name = e.currentTarget.value;
          }}
        />
        {#if invalidName}
          <span class="error">Длина минимум 3</span>
        {/if}
      </div>
      <div class="container">
        <label for="">Тариф газа</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={gasPrice}
        />
        <NumberInputError value={gasPrice} />
      </div>
      <div class="container">
        <label for="">Распределение тариф</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={gasRaspred}
        />
        <NumberInputError value={gasRaspred} />
      </div>
      <div class="container">
        <label for="">Тариф воды</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={waterPrice}
        />
        <NumberInputError value={waterPrice} />
      </div>
      <div class="container">
        <label for="">Абонплата</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={abonplata}
        />
        <NumberInputError value={abonplata} />
      </div>
      <div class="container">
        <label for=""> Тариф электроинергии</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={electricityPrice}
        />
        <NumberInputError value={electricityPrice} />
      </div>

      <div class="container">
        <label for="">Квартплата</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={kvartplata}
        />
        <NumberInputError value={kvartplata} />
      </div>
      <div class="container">
        <label for="">Мусор</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={garbage}
        />
        <NumberInputError value={garbage} />
      </div>

      <div class="container">
        <label for="">Отопление</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={heating}
        />
        <NumberInputError value={heating} />
      </div>
      <div class="container">
        <label for="">Интернет</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={internet}
        />
        <NumberInputError value={internet} />
      </div>
      <div class="container">
        <label for="">Домофон</label>
        <input
          required
          step="0.01"
          min="0"
          type="number"
          bind:value={intercom}
        />
        <NumberInputError value={intercom} />
      </div>
    </div>

    <button disabled={!name.length || name.length < 3}>Добавить</button>
  </form>
</article>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    width: 100%;
  }

  header h1 {
    max-width: 30ch;
    width: 100%;
  }

  .address {
    gap: 1rem;
    margin-block-start: 4em;
    padding-block-end: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    place-content: center;
    margin-bottom: 1rem;
    width: 90%;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .container:first-child {
    grid-column: 1 / -1;
    width: 100%;
  }

  form {
    background-color: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    justify-content: center;

    width: 100%;
    border-radius: 1rem;
    padding: 1rem;
    gap: 1rem;
  }

  input {
    /* padding: 1rem 2rem; */
    width: 100%;
    border: none;
    border-radius: 7px;
    padding: 0 20px;
    height: 60px;
    outline: 2px solid black;
  }

  button {
    padding: 1em 2em;
    background-color: var(--primary-color);
    color: var(--text);

    border-radius: 6px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--primary-color);
  }

  button:disabled {
    cursor: not-allowed;
    background-color: var(--color-light);
  }

  button:disabled:hover {
    border-color: var(--danger);
  }

  .danger {
    outline-color: var(--danger);
  }

  .error {
    color: var(--danger);
  }

  @media screen and (max-width: 800px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
