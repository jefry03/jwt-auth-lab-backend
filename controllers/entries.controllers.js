const express = require("express");
const Entry = require("../models/Entry");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

async function validate(req, res) {
	try {
		const { title, entryBody, isPublic } = req.body;
		const entry = await Entry.create({
			title,
			entryBody,
			isPublic,
			owner: req.user._id,
		});

		return res.status(201).json(entry);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

async function findEntry(req, res) {
	try {
		const entries = await Entry.find({ isPublic: true });
		return res.status(200).json(entries);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

async function findMyEntries(req, res) {
	try {
		const entries = await Entry.find({ owner: req.user._id });
		return res.status(200).json(entries);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

async function updateEntry(req, res) {
	try {
		const entry = await Entry.findById(req.params.id)
		if (!entry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		if (entry.owner !== req.user._id) {
			return res.status(403).json({ error: "You are not allowed to edit this entry" });
		}

		const { title, entryBody, isPublic } = req.body;
		entry.title = title;
		entry.entryBody = entryBody;
		entry.isPublic = isPublic;
		return res.status(200).json(entry);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

async function deleteEntry(req, res) {
	try {
		const entry = await Entry.findById(req.params.id);
		if (!entry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		if (entry.owner !== req.user._id) {
			return res.status(403).json({ error: "You are not allowed to delete this entry" });
		}

		await entry.deleteOne();
		return res.status(200).json({ message: "Entry deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

module.exports = {
  validate,
  findEntry,
  findMyEntries,
   updateEntry ,
   deleteEntry
};

