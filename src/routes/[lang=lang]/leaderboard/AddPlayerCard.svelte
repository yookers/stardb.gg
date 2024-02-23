<script lang="ts">
	import { UserPlus, Plus, Info } from 'lucide-svelte';
	import BaseCard from '$components/BaseCard.svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { locale } from '$store';

	export let addPlayerUID: (uid: string) => Promise<void>;

	let showCard = false;
	let playerUID = '';
	let errorMessage = '';

	function handleAddPlayer(playerUID: string) {
		// Check if UID is 9 digits
		/^\d{9}$/.test(playerUID) ? addPlayerUID(playerUID) : (errorMessage = 'UID must be 9 digits.');
	}

	function handleKeyDown(e: KeyboardEvent) {
		errorMessage = ''; // Reset error message
		if (e.key === 'Enter') {
			handleAddPlayer(playerUID);
		}
	}

	const addPlayerText = {
		chs: '添加玩家',
		cht: '添加玩家',
		de: 'Spieler hinzufügen',
		en: 'Add Player',
		es: 'Agregar Jugador',
		fr: 'Ajouter un joueur',
		id: 'Tambah Pemain',
		jp: 'プレイヤー追加',
		kr: '플레이어 추가',
		pt: 'Adicionar Jogador',
		ru: 'Добавить игрока',
		th: 'เพิ่มผู้เล่น',
		vi: 'Thêm người chơi'
	};

	const uidInfoText = {
		chs: '找不到玩家？在下面添加ta的UID！',
		cht: '找不到玩家？在下面添加ta的UID！',
		de: 'Du kannst einen Spieler nicht finden? Füge seine UID unten hinzu!',
		en: "Can't find a player? Add their UID below!",
		es: 'No puedes encontrar a un jugador? Agrega su UID a continuación!',
		fr: 'Tu ne trouves pas un joueur ? Ajoute leur UID ci-dessous!',
		id: 'Pemain tidak ditemukan? Tambahkan UID mereka dibawah!',
		jp: 'プレイヤーが見つかりません？以下でUIDを探してみましょう～',
		kr: '플레이어를 못 찾고 계신가요? UID를 추가해 보세요!',
		pt: 'Não consegue encontrar um jogador? Adicione o seu UID abaixo!',
		ru: 'Не можете найти игрока? Добавьте его UID в поле ниже!',
		th: 'หาผู้เล่นไม่เจอเหรอ? เพิ่ม UID ด้านล่างเลย!',
		vi: 'Không thể tìm thấy người chơi? Thêm UID của họ vào dưới đây!'
	};

	const addUidText = {
		chs: '添加玩家UID',
		cht: '添加玩家UID',
		de: 'Spieler UID hinzufügen',
		en: 'Add Player Uid',
		es: 'Agregar UID de Jugador',
		fr: 'Ajouter un UID de joueur',
		id: 'Tambah UID pemain',
		jp: 'UID入力',
		kr: '플레이어 UID 추가',
		pt: 'Adicionar UID de Jogador',
		ru: 'Добавить UID игрока',
		th: 'เพิ่ม UID ของผู้เล่น',
		vi: 'Thêm UID người chơi'
	};
</script>

<BaseCard label={addPlayerText[$locale]} title={addPlayerText[$locale]}>
	<div slot="icon">
		<UserPlus class="h-5 w-5 text-off_white" />
	</div>
	<div slot="content" class="space-y-2 px-5 pb-3 pt-4">
		<div class="flex items-center space-x-2 pl-2">
			<Info class="mt-0.5 h-4 w-4" />
			<p class="text-xs sm:text-sm">{uidInfoText[$locale]}</p>
		</div>
		<div class="flex">
			<input
				class="h-10 w-full rounded-l-full border-y-2 border-l-2 border-transparent bg-galaxy_purple-700 px-5 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-galaxy_purple-250 focus:border-galaxy_purple-300 sm:text-base"
				class:focus:border-neon_pink={errorMessage}
				type="text"
				placeholder={addUidText[$locale]}
				bind:value={playerUID}
				on:keydown={handleKeyDown}
			/>
			<button
				class="rounded-r-full bg-galaxy_purple-300 px-2.5 text-galaxy_purple-700 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
				aria-label="Add player UID"
				on:click={() => handleAddPlayer(playerUID)}
			>
				<Plus class="h-5 w-5" />
			</button>
		</div>
		{#if errorMessage}
			<p class="pl-4 text-xs font-bold text-neon_pink">{errorMessage}</p>
		{/if}
	</div>
</BaseCard>
