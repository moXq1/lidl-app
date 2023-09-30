<script lang="ts">
  import { addressData } from "../../../../store";
  import { tarifData } from "../../../../storeTarif";
  import { page } from "$app/stores";

  export let data: {
    tarifs: Tarif[] | null;
  };

  function handleRedirect(tarif: Tarif) {
    tarifData.updateStoreTarifData(tarif);
  }

  function formatDate(seconds: number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(seconds);
    return `${t.getDate().toString().padStart(2, "0")}.${t
      .getUTCMonth()
      .toString()
      .padStart(2, "0")}.${t.getFullYear()}`;
  }

  async function deleteHandler(id: string) {
    try {
      const resp = await fetch(`/tarif/${$page.params.addressID}`, {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const r = await resp.json();
      if (r) {
        data.tarifs = data.tarifs!.filter((tarif) => tarif.id !== id);
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

<h1>
  {$addressData.name}
</h1>
{#if data.tarifs}
  <a
    class="new-tarif no-decoration"
    href="/address/{$page.params.addressID}/new"
    >Добавить новый тариф
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 16 16"
      ><path
        fill="currentColor"
        d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"
      /></svg
    ></a
  >{/if}

{#if !data.tarifs}
  <div class="no-data">
    <p>Пока здесь нет данных</p>
    <a
      class="new-tarif no-decoration"
      href="/address/{$page.params.addressID}/new"
      >Добавить новый тариф
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 16 16"
        ><path
          fill="currentColor"
          d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"
        /></svg
      ></a
    >
  </div>
{:else}
  <div class="content">
    {#each data.tarifs as tarif (tarif.id)}
      <!-- <a
      on:click={() => handleRedirect(tarif)}
      href="/address/{tarif.addressID}/update/{tarif.id}"
    >
      <p>{tarif.id}</p>
    </a> -->
      <!-- <div class="tarif">
        
 
        <span class="all">{tarif.total}</span>
      </div> -->

      <div class="tarif">
        <div class="settings" />

        <div class="date">Дата: {formatDate(tarif.createdAt?.seconds)}</div>

        <div class="tarif-table">
          <div class="current">
            <span class="curr">Текущие</span>
            <div class="group">
              <span class="data">💧: {tarif.currWater}</span>
              <span class="data">💨: {tarif.currGas}</span>
              <span class="data">⚡: {tarif.currElec}</span>
            </div>
          </div>
          <div class="prev">
            <span class="prv">Предыдущие</span>
            <div class="group">
              <span class="data">💧: {tarif.prevWater}</span>
              <span class="data">💨: {tarif.prevGas}</span>
              <span class="data">⚡: {tarif.prevElec}</span>
            </div>
          </div>
          <div class="distinction">
            <span class="dist">Разница</span>
            <div class="group">
              <span class="data">💧: {tarif.distinctionWater} </span>
              <span class="data">💨: {tarif.distinctionGas}</span>
              <span class="data">⚡: {tarif.distinctionElec}</span>
            </div>
          </div>
          <div class="ttl">
            <span class="ttlname">Всего</span>
            <div class="group">
              <span class="data">💧: {tarif.totalWater}</span>
              <span class="data">💨: {tarif.totalGas}</span>
              <span class="data">⚡: {tarif.totalElec}</span>
            </div>
          </div>
        </div>
        <div class="total">
          <span>В Сумме💰: </span>
          <span> {tarif.total}</span>
        </div>

        <div class="settings">
          <a
            class="no-decoration"
            on:click={() => handleRedirect(tarif)}
            href="/address/{tarif.addressID}/update/{tarif.id}">Изменить</a
          >
          <button on:click={() => deleteHandler(tarif.id)}>Удалить</button>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .no-data {
    display: grid;
    place-content: center;
    width: 100%;
    height: calc(90% - var(--size-step-4));
    font-weight: 500;
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .no-data::before {
    position: absolute;
    content: "";
    z-index: -1;
    width: 30%;
    aspect-ratio: 1;
    border: 2px solid white;
    background-color: var(--forms);

    border-radius: 50%;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
  }

  .new-tarif {
    position: relative;
    font-size: var(--size-step-1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: max-content;
  }

  .new-tarif:hover::before {
    animation: link ease 1s 1 300ms;
    transform-origin: right;
  }

  .new-tarif::before {
    position: absolute;
    inset-block-end: -5px;
    content: "";
    width: 100%;
    height: 2px;
    background-color: blue;
    transition: background-color 0.5s ease-in-out;
    transform: scale(1, 1);
  }

  @keyframes link {
    50% {
      transform: scaleX(0);
    }
    50.1% {
      transform: translateX(-100%) scaleX(-0.01);
    }
    100% {
      transform: translateX(-100%) scalex(-1);
    }
  }

  .settings {
    display: flex;
    justify-content: space-between;
    margin-block: 1rem;
  }

  .settings a,
  .settings button {
    transition: all 0.2s ease;

    padding: 10px 20px;

    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    border: none;
    color: white;
  }

  .settings a:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--primary-color);
  }
  .settings button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 50px -17px var(--danger);
  }

  .settings a {
    background-color: var(--primary-color);
  }

  .settings button {
    background-color: var(--danger);
    color: white;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-weight: 500;
    margin-block-start: 2rem;
    font-size: clamp(0.875rem, 0.7917rem + 0.4444vw, 1.125rem);
    /* background-color: white; */
  }

  .date,
  .total {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .date {
    padding-block-end: 0.5rem;
    margin-block-end: 1rem;
    border-block-end: 2px solid #aaa;
  }

  /* .settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block-end: 0.5rem;
    margin-block-end: 1rem;
    border-block-end: 2px solid #aaa;
  } */

  .total {
    padding-block-start: 0.5rem;
    margin-block-start: 1rem;
    border-block-start: 2px solid #aaa;
  }

  @supports (gap: 1rem) {
    .tarif {
      margin-block: 1rem;
    }
  }

  .tarif {
    background-color: white;
    padding: 10px 20px;
    border-radius: 13px;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    margin-block: 3rem;
  }

  .tarif:nth-of-type(1) {
    margin-block-start: 0;
  }

  .tarif-table {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .current,
  .prev,
  .distinction,
  .ttl {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-block-end: 2px solid black;
    padding-block-end: 0.5rem;
  }

  .ttl {
    border-block-end: 0;
  }

  .group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .data {
    border-radius: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 1px 6px;
    background-color: var(--color-dark);
    color: white;
    font-size: clamp(0.875rem, 0.7917rem + 0.4444vw, 1.125rem);
  }

  /* @media screen and (min-width: 900px) {
    .no-data {
      position: absolute;
      height: 80%;
    }
  } */

  @media screen and (max-width: 376px) {
    .current,
    .prev,
    .distinction,
    .ttl {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
