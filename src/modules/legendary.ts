export default {
    actions: {
        type: Array({ name: String, entries: Array(String), count: Number }),
        required: false,
    },
    intro: {
        type: String,
        required: false,
    },
    action_count: Number,
    group: {
        type: String,
        required: false,
    },
}
