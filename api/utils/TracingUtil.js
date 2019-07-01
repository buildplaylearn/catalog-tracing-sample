function continueSpan(tracer, span, name, callback) {
    const nestedSpan = tracer.startSpan(name, {childOf: span})
    return callback(nestedSpan).then(result => {
        nestedSpan.finish()
        return result
    })
}

module.exports = continueSpan