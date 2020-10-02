const express = require('express')
const Note = require('../models/note')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/notes', auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id
    })

    try {
        await note.save()
        res.status(201).send(note)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /notes?limit=10&skip=20
// GET /notes?sortBy=createdAt:desc
router.get('/notes', auth, async (req, res) => {
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'notes',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.notes)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/notes/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const note = await Note.findOne({ _id, owner: req.user._id })

        if (!note) {
            return res.status(404).send({ error: 'Invalid ID! '})
        }

        res.send(note)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/notes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates! Either one of these entries does not exist or they cannot be changed!' })
    }

    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.user._id })

        if (!note) {
            res.status(404).send({ error: 'Invalid ID!' })
        }

        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        res.send(note)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/notes/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!note) {
            return res.status(404).send()
        }

        res.status(200).send(note)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router