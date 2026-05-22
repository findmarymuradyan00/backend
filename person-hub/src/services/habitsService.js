const { getAll, saveAll } = require("../models/habitModel")
const AppError = require("../utils/AppError")
const { generateId } = require("../utils/id")
const { validateHabit } = require("../utils/validateHabit")

const getAllHabits = (userId) => {
    const habits = getAll()
    return habits.filter(habit => habit.ownerId === userId)
}

const getHabitById = (id, userId) => {
    const habits = getAll()
    const habit = habits.find(habit => habit.id === id)

    if (!habit || habit.ownerId !== userId) {
        throw new AppError("Habit not found", 404)

    }

    return habit
}

const createHabit = (userId, name, frequency) => {
    validateHabit(name, frequency)

    const habits = getAll()

    const newHabit = {
        id: generateId("h"),
        ownerId: userId,
        name,
        frequency,
        checkIns: 0,         
        createdAt: new Date(),
        updatedAt: new Date()
    }

    habits.push(newHabit)
    saveAll(habits)

    return newHabit
}

const updateHabit = (id, userId, name, frequency) => {
    validateHabit(name, frequency, true)

    const habits = getAll()
    const habit = habits.find(habit => habit.id === id)

    if (!habit || habit.ownerId !== userId) {
        throw new AppError("Habit not found", 404)

    }

    if (name !== undefined) habit.name = name
    if (frequency !== undefined) habit.frequency = frequency
    habit.updatedAt = new Date()

    saveAll(habits)
    return habit
}

const checkIn = (id, userId) => {
    const habits = getAll()
    const habit = habits.find(habit => habit.id === id)

    if (!habit || habit.ownerId !== userId) {
        throw new AppError("Habit not found", 404)

    }

    habit.checkIns += 1       

    saveAll(habits)
    return habit
}

const deleteHabit = (id, userId) => {
    const habits = getAll()
    const habit = habits.find(habit => habit.id === id)

    if (!habit || habit.ownerId !== userId) {
        throw new AppError("Habit not found", 404)

    }

    const filtered = habits.filter(habit => habit.id !== id)
    saveAll(filtered)

    return { message: "Habit deleted successfully" }
}

module.exports = { getAllHabits, getHabitById, createHabit, updateHabit, checkIn, deleteHabit }