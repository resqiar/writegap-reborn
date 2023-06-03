export type ManageAction = 'unpublish' | 'publish' | 'edit' | 'remove';

export const manageActionModal: Record<ManageAction, { title: string; desc: string }> = {
	unpublish: {
		title: 'Confirm Unpublishing',
		desc: 'Please confirm your intention to unpublish. When a blog is unpublished, it becomes inaccessible to other users.'
	},
	publish: {
		title: 'Confirm Publishing',
		desc: 'Are you sure you want to publish? This action will make the content visible to the public.'
	},
	edit: {
		title: 'Confirm Editing',
		desc: 'Are you sure you want to edit? This action may affect the existing content.'
	},
	remove: {
		title: 'Confirm Deletion',
		desc: 'Are you sure you want to delete? This action cannot be undone and will permanently remove the item.'
	}
};
