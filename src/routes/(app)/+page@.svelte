<script lang="ts">
  import { goto, invalidate, invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";
  import AddressCard from "../../components/AddressCard.svelte";
  import { addressData } from "../../store";
  import { deleteAddressHandler, gotoTarifPage } from "../../utils";

  onMount(() => {
    // document.location.reload();
    // const interval = setInterval(() => {
    //   invalidateAll();
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  });

  export let data: { addresses: Address[] | null };

  async function deleteAddress(id: string) {
    try {
      const r = await deleteAddressHandler(id);
      if (r) {
        data.addresses = data.addresses!.filter((add) => add.id !== id);
      }
      if (id === $addressData.id) {
        goto("/");
      }
    } catch (e) {}
  }

  function gotoTarifPageHandler(id: string) {
    gotoTarifPage(id, data);
  }
</script>

<article class="flow">
  {#if data.addresses}
    <h1>Адреса</h1>
  {/if}
  <div class="cont">
    {#if !data.addresses}
      <div class="no-data">
        <p>Пока здесь нет данных</p>
        <a class="new-tarif no-decoration" href="/address"
          >Добавить новый адрес
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            ><path
              fill="currentColor"
              d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"
            /></svg
          >
        </a>
      </div>
    {:else}
      <a class="add no-decoration" href="/address">
        <h3>Добавить новый</h3>
        <div>+</div>
      </a>
      {#each data.addresses as address (address.id)}
        <AddressCard {address} {deleteAddress} {gotoTarifPageHandler} />
      {/each}
    {/if}
  </div>
</article>

<style>
  article {
    margin-block-start: 5em;
  }

  .no-data {
    display: grid;
    place-content: center;
    width: 100%;
    height: calc(80vh - var(--size-step-4));
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

  .cont {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    align-items: center;
    justify-content: center;
  }

  .add {
    width: 100%;
    background-color: white;
    padding: 2rem;
    border-radius: 13px;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    align-self: stretch;
  }

  .add div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid currentColor;
    font-size: 25px;
    color: #777;
    display: grid;
    place-content: center;
  }

  :is(.add) :is(h3, div) {
    transition: all 0.3s ease;
  }
  :is(.add:hover) :is(h3, div) {
    color: var(--accent-color);
  }

  @media screen and (max-width: 741px) {
    .cont {
      justify-content: center;
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .add {
      flex: 1;
      align-self: center;
    }
  }
</style>
