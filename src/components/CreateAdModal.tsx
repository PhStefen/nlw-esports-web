
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToogleGroup from '@radix-ui/react-toggle-group';

import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
    id: string,
    title: string
}
export function CreateAdModal() {


    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => setGames(response.data));
    }, []);

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel
            });

            alert('Anúncio criado com sucesso!');
        } catch (error) {
            console.log(error);
            alert('Erro ao criar o anúncio');
        }
    }

    return (

        <Dialog.Portal>

            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>

                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/50'>

                    <Dialog.Title className='text-3xl font-black'>Publique um Anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                            <select
                                id='game'
                                name='game'
                                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                                defaultValue=""
                            >
                                <option disabled selected>Selecione o game que deseja jogar</option>
                                {
                                    games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)
                                }
                            </select>

                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Seu nome (ou nickname)</label>
                            <Input
                                id='name'
                                name='name'
                                placeholder='Como se chamam dentro do game'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input
                                    type="number"
                                    id='yearsPlaying'
                                    name='yearsPlaying'
                                    placeholder='Tudo bem ser ZERO'
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="discord">Seu discord    </label>
                                <Input
                                    id='discord'
                                    name='discord'
                                    placeholder='Usuario#0000'
                                />
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label>Quando costuma jogar?</label>

                                <ToogleGroup.Root
                                    className='grid grid-cols-4 gap-2'
                                    type='multiple'
                                    onValueChange={setWeekDays}
                                >
                                    <ToogleGroup.Item
                                        value='0'
                                        className={`h-8 w-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Domingo'
                                    >
                                        D
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='1'
                                        className={`h-8 w-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Segunda'
                                    >
                                        S
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='2'
                                        className={`h-8 w-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Terça'
                                    >
                                        T
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='3'
                                        className={`h-8 w-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Quarta'
                                    >
                                        Q
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='4'
                                        className={`h-8 w-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Quinta'
                                    >
                                        Q
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='5'
                                        className={`h-8 w-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Sexta'
                                    >
                                        S
                                    </ToogleGroup.Item>

                                    <ToogleGroup.Item
                                        value='6'
                                        className={`h-8 w-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                        title='Sábado'
                                    >
                                        S
                                    </ToogleGroup.Item>
                                </ToogleGroup.Root>
                            </div>

                            <div className='flex flex-col gap-2 flex-1'>
                                <label htmlFor="hourStart">Qual o hoário do dia?</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input
                                        type="time"
                                        id="hourStart"
                                        name='hourStart'
                                    />
                                    <Input
                                        type="time"
                                        id="hourEnd"
                                        name='hourEnd'
                                    />
                                </div>
                            </div>

                        </div>

                        <label className='mt-2 flex gap-2 text-sm items-center cursor-pointer'>

                            <Checkbox.Root
                                className='w-6 h-6 p-1 rounded bg-zinc-900'
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => setUseVoiceChannel(checked === true)}

                            >
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>

                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className='mt-4 flex gap-4 justify-end'>

                            <Dialog.Close
                                className=' px-5 h-12 rounded-md font-semibold bg-zinc-500 hover:bg-zinc-600'
                                type='button'
                            >Cancelar
                            </Dialog.Close>

                            <button
                                type="submit"
                                className='px-5 h-12 rounded-md font-semibold flex items-center gap-3 bg-violet-500 hover:bg-violet-600'
                            >
                                <GameController size={24} />
                                Encontrar duo
                            </button>

                        </footer>


                    </form>

                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}