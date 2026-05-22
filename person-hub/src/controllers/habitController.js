const asyncHandler = require("../utils/asyncHandler")
const { getAllHabits, getHabitById, createHabit, updateHabit, checkIn, deleteHabit } = require("../services/habitsService")
const getAll = asyncHandler((req, res) => {
    const habits = getAllHabits(req.user.id)
    res.status(200).json(habits)
})

const getById = asyncHandler((req, res) => {
    const habit = getHabitById(req.params.id, req.user.id)
    res.status(200).json(habit)
})

const create = asyncHandler((req, res) => {
    const { name, frequency } = req.body
    const habit = createHabit(req.user.id, name, frequency)
    res.status(201).json(habit)
})

const update = asyncHandler((req, res) => {
    const { name, frequency } = req.body
    const habit = updateHabit(req.params.id, req.user.id, name, frequency)
    res.status(200).json(habit)
})

const handleCheckIn = asyncHandler((req, res) => {
    const habit = checkIn(req.params.id, req.user.id)
    res.status(200).json(habit)
})

const remove = asyncHandler((req, res) => {
    const result = deleteHabit(req.params.id, req.user.id)
    res.status(200).json(result)
})

module.exports = { getAll, getById, create, update, handleCheckIn, remove }