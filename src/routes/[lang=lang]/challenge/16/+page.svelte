<script lang="ts">
	import { MessageType } from '$types';

	let passwords = [
		'Clara Protection Society is Seeking New Members!',
		'AOODUOINETMA',
		'WacqIsland15754Star32',
		'23aдзев345751ккaBвopтcO'
	];
	let questions = [
		'What is the name of the book?',
		'In Crossword Clue Number Ascending Order, align the corresponding true relationships from Logic Grid to get your next password. Priority: Lower Number, Top to Bottom, Left to Right. No repeats!',
		'Not quite right… Try again 📅📈',
		'Ok, the princess is not in this castle. Surely the next one? 🇷🇺🪞'
	];
	let currentPasswordIndex = 0;
	let inputValue = '';
	let challengeCompleted = false;
	let completionTime = '';
	let message = '';
	let messageType: MessageType;

	function checkPassword() {
		if (inputValue === passwords[currentPasswordIndex]) {
			currentPasswordIndex++;
			messageType = MessageType.SUCCESS;
			message = 'Correct! Please enter the next password.';
			inputValue = '';
		} else {
			messageType = MessageType.ERROR;
			message = 'Incorrect password. Please try again.';
			inputValue = '';
		}
		if (currentPasswordIndex === 4) {
			challengeCompleted = true;
			const now = new Date();
			completionTime = `Challenge completed at [${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`;
		}
	}
</script>

<div class="flex h-full w-full justify-center">
	<div class="flex w-side flex-col items-center justify-center space-y-4 px-6 text-off_white sm:px-3">
		<h1 class="text-3xl font-bold text-off_white">Challenge #16</h1>
		{#if !challengeCompleted}
			{#if currentPasswordIndex === 1}
				<p class="text-lg font-semibold">{questions[currentPasswordIndex]}</p>
				<a
					href="https://docs.google.com/spreadsheets/d/1pXNHduGC-53JFlvDW_CvSloosEhzr9CU9qv9MAXdY-U/edit?usp=sharing"
					class="underline"
					target="_blank"
					rel="noopener noreferrer">> Link to Logic Puzzle</a
				>
			{:else}
				<p class="text-lg font-semibold">{questions[currentPasswordIndex]}</p>
			{/if}
			<div class="flex">
				<input
					placeholder="Enter password {currentPasswordIndex + 1}..."
					id="password"
					class="h-12 w-full rounded-l-xl border-y-2 border-l-2 border-transparent bg-galaxy_purple-150 px-5 text-base font-bold text-galaxy_purple-600 outline-none placeholder:text-galaxy_purple-600 hover:border-galaxy_purple-250 md:w-[600px] md:text-lg"
					bind:value={inputValue}
					on:keyup={(e) => e.key === 'Enter' && checkPassword()}
				/>
				<button
					class="rounded-r-xl bg-galaxy_purple-250 px-4 font-semibold text-galaxy_purple-600 hover:scale-105"
					on:click={checkPassword}>Submit</button
				>
			</div>
			<div class:text-neon_pink={messageType === MessageType.ERROR} class:text-neon_green={messageType === MessageType.SUCCESS}>
				{message}
			</div>
		{:else}
			<p class="text-2xl font-bold">Congrats on completing the challenge!</p>
			<div>{completionTime}</div>
		{/if}
	</div>
</div>
