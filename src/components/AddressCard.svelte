<script lang="ts">
  import { gotoTarifPage } from "../utils";
  import Arrow from "./Arrow.svelte";

  export let address: Address;
  export let deleteAddress: (id: string) => void;
  export let gotoTarifPageHandler: (id: string) => void;
</script>

<div class="card flow">
  <a
    class="head no-decoration"
    on:click={() => gotoTarifPageHandler(address.id)}
    href="/address/{address.id}"
    >{address.name}
  </a>

  <div class="btns">
    <a
      on:click={() => gotoTarifPageHandler(address.id)}
      class="no-decoration"
      href="/address/update/{address.id}">Изменить</a
    >
    <button
      on:click|preventDefault|stopPropagation={(e) => {
        e.stopImmediatePropagation();
        deleteAddress(address.id);
      }}>Удалить</button
    >
  </div>
</div>

<style>
  .card {
    /* max-width: 300px; */
    width: 100%;
    background-color: white;
    padding: 2rem;
    border-radius: 13px;
    flex: 1 1 300px;
    max-width: 400px;
  }

  .head {
    font-size: var(--size-step-2);
    line-height: 1.1;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block-end: 1rem;
  }

  .head:hover {
    color: var(--accent-color);
  }

  .btns {
    display: flex;
    gap: 2rem;
    margin-block-start: 1.5rem;
  }

  .btns a,
  .btns button {
    padding: 1em 2em;

    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    transition: all 0.3s ease;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }

  .btns a:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--primary-color);
  }
  .btns button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--danger);
  }

  .btns a {
    background-color: var(--primary-color);
    color: var(--text);
  }

  .btns button {
    background-color: var(--danger);
    color: white;
  }

  @media screen and (max-width: 741px) {
    .card {
      flex: 1;
    }
  }

  @media screen and (max-width: 401px) {
    .btns a,
    .btns button {
      font-size: 14px;
      padding: 0.5em 1em;
    }
    .btns {
      gap: 1rem;
    }
  }
</style>
