<script lang="ts">
  import { page } from "$app/stores";
  import { logout, singin, signup, user } from "$lib/stores/auth";
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";

  onMount(() => {
    if ($page.data.uid) {
      goto("/", { invalidateAll: true });
    }
  });

  let email = "";
  let password = "";
  let auth: "login" | "signup" = "login";
  let error: string = "";
  let invalidPassword = false;
  let invalidEmail = false;

  function toggle() {
    error = "";
    if (auth === "login") {
      auth = "signup";
    } else {
      auth = "login";
    }
  }
</script>

<article>
  <form>
    <h3>
      {#if auth === "login"}
        Вход
      {:else}
        Регистрация
      {/if}
    </h3>

    <div class="cont">
      <label for="email">Почта</label>
      <input
        on:focus={() => {
          invalidEmail = false;
        }}
        on:blur={(e) => {
          if (!email.includes("@")) {
            invalidEmail = true;
          }
        }}
        class:danger-input={invalidEmail}
        type="email"
        name="email"
        id="email"
        bind:value={email}
      />
      {#if invalidEmail}
        <span class="danger"> Неправильный емайл </span>
      {/if}
    </div>

    <div class="cont">
      <label for="password">Пароль</label>
      <input
        class:danger-input={invalidPassword}
        type="password"
        name="password"
        id="password"
        on:focus={() => {
          invalidPassword = false;
        }}
        on:blur={(e) => {
          if (password.length < 6) {
            invalidPassword = true;
          }
        }}
        minlength="6"
        bind:value={password}
      />
      {#if invalidPassword}
        <span class="danger"> минимум 6 символов </span>
      {/if}
    </div>

    <div class="actions">
      {#if error}
        <span class="danger">{error}</span>
      {/if}
      {#if auth === "login"}
        <button
          disabled={invalidEmail && invalidPassword}
          type="button"
          on:click={async () => {
            try {
              await singin(email, password);
              console.log("kek");
            } catch (err) {
              error = "Неверный логин или пароль";
            }
          }}>Вход</button
        >
        <p>
          Нет акаунта
          <span on:click={toggle}> клик</span>
        </p>
      {:else}
        <button
          disabled={invalidEmail && invalidPassword}
          type="button"
          on:click={async () => {
            try {
              await signup(email, password);
            } catch (err) {
              error = "Что-то пошло не так";
            }
          }}>Регистрация</button
        >
        <p>
          Есть акаунт
          <span on:click={toggle}>клик</span>
        </p>
      {/if}
    </div>
  </form>
</article>

<style>
  .danger-input {
    outline-color: var(--danger);
  }

  button {
    background: transparent;
    margin-block-start: 2rem;
    padding: 5px 15px;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:hover {
    background-color: hsl(214.3 31.8% 91.4%);
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cont {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-block-start: 1rem;
  }

  input {
    width: 100%;
    border-radius: 7px;
    padding: 0 20px;
    height: 50px;
    border: none;
    outline: 2px solid black;
  }

  article {
    margin-block-start: 6em;
    padding-block-end: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    border-radius: 1rem;
    max-width: 35rem;
  }

  span {
    color: blue;
    cursor: pointer;
  }

  .danger {
    color: var(--danger);
  }
</style>
