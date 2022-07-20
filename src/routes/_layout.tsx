import {
	component$,
	Host,
	Slot,
	useContextProvider,
	useServerMount$,
	useStore,
} from '@builder.io/qwik';
import { ACTIVE_ORDER, COLLECTIONS } from '~/constants';
import { getCollectionsQuery } from '~/graphql/queries';
import { Collection } from '~/types';
import { sendQuery } from '~/utils/api';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

export default component$(() => {
	const state = useStore<{ collections: Collection[] }>({ collections: [] });
	useServerMount$(async () => {
		const { collections } = await sendQuery<{ collections: { items: Collection[] } }>(
			getCollectionsQuery()
		);
		state.collections = collections.items;
	});
	useContextProvider(COLLECTIONS, state);
	useContextProvider(ACTIVE_ORDER, {});

	return (
		<Host>
			<Header />
			<main>
				<Slot />
			</main>
			<Footer />
		</Host>
	);
});
