<script setup lang="ts">
import { cancelHandler, createInputManager, eventListenerFactory, getPostService, getPostsRepositoryJSONPlaceHolder, mainPageLogic, nativeOnInitJob, useAxiosHttp, useEventHadler } from '@mono/core';
import { compositionOnInit } from '../../core/on-init/compositionOnInit';
import { stateFactoryProvider } from '../../core/state-factory/state-factory';
import { useWatchStateObserver } from '../../core/state-observer/useWatchStateObserver';
import { nativeValueProvider } from '../../core/value-provider/nativeValueProvider';
    const eventHandler = useEventHadler(nativeValueProvider())
    const {
        inputValue,
        onChangeInput,
        posts,
        isLoadingPosts,
        errorPosts,
        errorInput,
        eventState,
    } = mainPageLogic(
        stateFactoryProvider(),
        useWatchStateObserver(),
        nativeOnInitJob(
            stateFactoryProvider(),
            useWatchStateObserver(),
            compositionOnInit(),
        ),
        getPostService(
            getPostsRepositoryJSONPlaceHolder(
                useAxiosHttp('https://my-json-server.typicode.com/'),
                cancelHandler(nativeValueProvider(), compositionOnInit()),
            ),
        ),
        createInputManager(stateFactoryProvider()),
        eventHandler,
        eventListenerFactory(compositionOnInit(), eventHandler),
    )
</script>
<template>
    <div v-if="isLoadingPosts.value ">
        <h1>Loading...</h1>
    </div>
    <div v-if="errorPosts.value">
        <h1>Error on loading posts</h1>
    </div>
    <div v-if="!isLoadingPosts.value && !errorPosts.value">
        <h1>Hello world</h1>
        <h2>{{inputValue.value}}</h2>
        <div v-if="errorInput.value">
            <h3>{{ errorInput.value }}</h3>
        </div>
        <input 
            :value="inputValue.value" 
            @input="event => onChangeInput((event.target as HTMLInputElement).value || '')" 
        />
        <p>{{ eventState.value }}</p>
        <div v-for="post in posts.value" v-bind:key="post.id">
            <div>{{ post.title }}</div>
        </div>
    </div>
</template>
