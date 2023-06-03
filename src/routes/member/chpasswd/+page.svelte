<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  export let data: PageData;
  export let form: ActionData;
</script>

<header>
  <strong>All Inputs are required!</strong>
</header>
<br />
<form method="POST" action="/member/chpasswd" use:enhance>
  <label>
    Enter current password:
    <input name="currpass" type="password" required />
  </label>
  <br />
  <br />
  <label>
    Enter new password:
    <input name="newpass" type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()_+-=[]{};':\"\\|,.<>/?)" required />
  </label>

  <br />
  <br />
  <label>
    Enter new password again:
    <input name="newpass2" type="password" required />
  </label>

  <br />
  <br />
  <button type="submit"> Submit </button>
  {#if form?.success}
    {form?.message}
  {/if}
</form>
