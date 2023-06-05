<script lang="ts">

</script>

<header>
	<h1>Register</h1>
</header>

<form
	method="POST">
	<label>
		NetID (new Username):
		<input name="username" type="text" required />
	</label>
	<br />
	<label>
		Create a new Password:
		<input name="password" type="required" required/>
	</label>
	<br />
	<label>
		Confirm new password:
		<input name="password2" type="required" required/>
	</label>
	<br />
	<label>
		UIN:
		<input name="uin" type="tel" required />
	</label>
	<br />
	<label>
		Email:
		<input name="email" type="email" required />
	</label>
	<br />
	<label>
		Given Name:
		<input name="gname" type="text" required/>
	</label>
	<br />
	<label>
		Last Name:
		<input name="lname" type="text" />
	</label>
	<br />
	<label>
		Major:
		<input name="major" type="text"  />
	</label>
	<br />
	<label>
		College:
		<input name="college" type="text"  />
	</label>
	<br />
	<label>
		Phone:
		<input name="phone" type="tel" />
	</label>


</form>

<!-- New-ADUser  -->
<!-- -SamAccountName $user.username  -->
<!-- -EmployeeID $user.uin  -->
<!-- -Department $user.major  -->
<!-- -Company $user.college  -->
<!-- -EmailAddress $user.email  -->
<!-- -MobilePhone $user.phone  -->
<!-- -GivenName $user.fn  -->
<!-- -Surname $user.ln  -->
<!-- -EmployeeNumber $user.receipt  -->
<!-- -Name $someName  -->
<!-- -Organization $user.netid  -->
<!-- -Enable $true  -->
<!-- -AccountPassword $newPassword  -->
<!-- -Path "ou=november,ou=2019,ou=acmusers,dc=acm,dc=cs" -->
