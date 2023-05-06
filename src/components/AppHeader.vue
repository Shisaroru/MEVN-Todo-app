<template>
    <nav>
        <router-link :to="{ name: 'dashboard'}">
            Dashboard
        </router-link>
        <router-link :to="{ name: 'add'}">
            Add new works
        </router-link>
        <router-link :to="{ name: 'login'}">
            Log out
        </router-link>
    </nav>
</template>