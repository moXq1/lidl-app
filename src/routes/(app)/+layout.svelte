<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { addressData } from "../../store";
  import { deleteAddressHandler, gotoTarifPage } from "../../utils";

  export let data: { addresses: Address[] | null };

  let active = false;

  async function deleteAddress(e: MouseEvent, id: string) {
    // e.target!.closest();
    //  const el = e.currentTarget!.closest(".address")
    e.preventDefault();
    e.stopImmediatePropagation();

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

  onMount(() => {
    if (window.innerWidth >= 900) {
      active = true;
    }
  });
</script>

<!-- <svelte:window on:onorientationchange={(e=>)}> -->

<svelte:window
  on:resize={(e) => {
    if (window.innerWidth >= 900) {
      active = true;
      return;
    }
    if (!active) {
      return;
    }

    active = false;
  }}
/>

<div class="main-content">
  <aside class:active>
    <button
      class="option"
      class:hidden={active}
      on:click={() => {
        active = true;
        document.body.style.overflow = "hidden";
      }}
    >
      Адреса
    </button>
    <div class:hidden={!active} class="head">
      <h3>Addresses</h3>
      <div
        class="close"
        on:click={(e) => {
          active = false;
          document.body.style.overflow = "";
        }}
      >
        esc
      </div>
    </div>

    {#if !data.addresses}
      <p>No data</p>
    {:else}{#each data.addresses as address (address.id)}
        <a
          class:hidden={!active}
          on:click={() => {
            if (window.innerWidth >= 900) {
              active = true;
            } else {
              active = false;
            }

            gotoTarifPage(address.id, data);
          }}
          href="/address/{address.id}"
          class="address"
          class:current={address.id === $addressData.id}
        >
          {address.name}
          <div class="actions">
            <a href="/address/update/{address.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                {...$$props}
                ><path
                  fill="currentColor"
                  d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
                /><path
                  fill="currentColor"
                  d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
                />
              </svg>
            </a>

            <button
              class="btn"
              on:click|preventDefault|stopPropagation={(e) =>
                deleteAddress(e, address.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                {...$$props}
                ><path
                  fill="currentColor"
                  d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                /></svg
              >
            </button>
          </div>
        </a>
      {/each}{/if}

    <a class="new" class:hidden={!active} href="/address">
      <span>Новый Адрес</span>
      <div /></a
    >
  </aside>
  <main>
    <slot />
  </main>
</div>

<!-- <p>{$addressData.name} - {$addressData.id}</p> -->

<style>
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
    margin-block-start: 1rem;
    padding-block-end: 1rem;
    border-block-end: 1px solid black;
  }

  .close {
    font-weight: bold;
    cursor: pointer;
    background-color: var(--color-light);
    padding: 1px 6px;
    border-radius: 5px;
    height: 30px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    align-self: flex-end;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
  }

  .close:hover {
    background-color: var(--accent);
  }

  .new {
    width: 100%;

    border-radius: 7px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding-block: 10px;
    /* background-color: var(--accent-color); */

    background-position-y: -0%;
    background-image: linear-gradient(
      180deg,
      transparent 50%,
      var(--accent-color) 50%
    );
    background-size: auto 190%;
    transition: all 0.1s ease;
  }

  .new span {
    font-weight: 500;
  }

  .new div {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid currentColor;
    font-size: var(--size-step-2);
    color: var(--text);

    position: relative;
  }

  .new div:after {
    position: absolute;
    content: "+";
    font-size: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: currentColor;
  }

  .new:hover {
    background-position-y: 100%;
    color: var(--text);
    transition: all 0.1s ease;
  }

  :is(.new) :is(span, div) {
    transition: all 0.3s ease;
  }
  /* :is(.new:hover) :is(span, div) {
    color: var(--bg);
  } */

  .main-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    max-width: 75rem;
    margin-inline: auto;
    height: 95%;
    overflow-y: hidden;
    margin-block-start: 6em;
    padding-block-end: 4rem;
    /* margin-block-end: 2rem;
    min-height: 100%; */
  }

  aside {
    background-color: white;
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 10px;
    min-width: 200px;
    border-radius: 10px;

    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    overflow-y: auto;
    z-index: 100;
  }

  .active {
    height: 100%;
  }

  .address.current {
    background-color: var(--color-light);
  }

  .address.current:hover {
    background-color: var(--color-light);
  }

  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: white;
    font-weight: 500;
    cursor: pointer;
    padding: 15px 20px;

    border-radius: 7px;
  }

  .address:hover {
    background-color: var(--accent-color);
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    /* visibility: hidden; */
  }

  .actions a {
    border-radius: 50%;

    transition: all 0.2s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
  }

  .actions a:hover,
  .btn:hover {
    background-color: #e3bebe87;
  }

  a {
    text-decoration: none;
  }

  .address:hover .actions {
    visibility: visible;
  }

  svg {
    width: 100%;
    height: auto;
    max-width: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    scale: 0.8;
    object-fit: cover;
  }

  svg path {
    fill: black;
  }

  .btn {
    border: none;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;
    height: 2rem;
    width: 2rem;
  }

  main {
    width: 100%;
    overflow-y: auto;
    height: 100%;
    /* padding-block-end: 3rem; */
  }

  .hidden {
    display: none;
  }

  .new {
    margin-block-start: 1rem;

    margin-block-end: 3rem;
    padding-inline: 1rem;
  }

  .option {
    padding: 5px 20px;
    color: white;
    border-radius: 6px;

    flex: 1;
    transition: all 0.3s ease;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    border: none;
    background-color: var(--accent-color);
  }

  @media screen and (min-width: 900px) {
    .main-content {
      justify-content: space-between;
      align-items: inherit;
      flex-direction: row;
      padding-block-end: 2rem;
    }

    .actions {
      gap: 0.5em;
      flex-direction: column;
    }

    main {
      width: 75%;
      overflow-y: auto;
    }

    aside {
      position: sticky;
      border-radius: 13px;
      width: 25%;
      gap: 1rem;
    }

    .address {
      padding: 5px 20px;
      padding-inline-end: 0.5rem;
    }

    .option {
      display: none;
    }

    .close {
      display: none;
    }

    .active {
      height: auto;
    }

    .new {
      margin-block: 1rem;
      padding-block: 10px;
    }
  }
</style>
