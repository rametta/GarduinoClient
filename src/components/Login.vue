<template>
  <div>

    <v-alert v-if="error" color="error" icon="warning" value="true">
      <strong>{{error.errorCode}}</strong> {{error.message}}
    </v-alert>

    <v-form v-model="valid" ref="form" lazy-validation>

    <v-text-field
      label="Username"
      v-model="username"
      :rules="usernameRules"
      required
    ></v-text-field>

    <v-text-field
      label="Password"
      v-model="password"
      :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
      :append-icon-cb="() => (passwordVisible = !passwordVisible)"
      :type="passwordVisible ? 'text' : 'password'"
      required
    ></v-text-field>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </div>
</template>

<script>
import userService from './../services/user.service';

export default {
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [v => !!v || 'Username is required'],
    password: '',
    passwordRules: [v => !!v || 'Password is required'],
    passwordVisible: false,
    error: '',
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        userService
          .authenticate(this.username, this.password)
          .then(({ data }) => {
            console.log(data);
            this.$router.push({ path: '/' });
          })
          .catch(err => {
            this.error = err.response.data.responseStatus;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
      this.error = '';
    },
  },
};
</script>


<style scoped>

</style>
