const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    basics: {
        make: {
            type: String,
            required: [true, "Please enter the name of manufacturer"]
        },
        model: {
            type: String,
            required: [true, "Please enter the name of model"]
        },
        year: {
            type: Date,
        },
    },
    category: {
        type: String,
        required: [true, "Please enter the vehicle type"]
    },
    dimAndWt: {
        length: {
            type: Number,
            required: [true, "Please enter the length"]
        },
        width: {
            type: Number,
            required: [true, "Please enter the width"]
        },
        height: {
            type: Number,
            required: [true, "Please enter the height"]
        },
        wheelbase: {
            type: Number,
            required: [true, "Please enter the wheelbase"]
        },
        groundClearance: {
            type: Number
        },
        grossWt: {
            type: Number,
        },
        loadCapacity: {
            type: Number,
        }
    },
    suspension: {
        front: {
            type: String,
            required: true
        },
        rear: {
            type: String,
            required: true
        }
    },
    brake: {
        front: {
            type: String,
            required: true
        },
        rear: {
            type: String,
            required: true
        }
    },
    maxSpeed: {
        type: Number,
        required: [true, "Please enter the max speed"]
    },
    odometer: {
        type: String,
    },
    lights: {
        headLamp: {
            type: String,
            required: true
        },
        tailLamp: {
            type: String,
        }
    },
    batteryAndCharger: {
        battery: {
            batteryType: {
                type: String,
                required: true
            },
            chemistry: String,
            capacity: {
                type: Number,
                required: [true, "Please enter the battery capacity"]
            },
            maxRange: {
                type: Number,
                required: [true, "Please enter the maximum range"]
            },
            life: Number
        },
        charger: {
            outputCurrent: Number,
            chargingTime: {
                type: Number,
                required: true
            }
        }
    },
    usbCharging: {
        type: Boolean,
        default: false
    },
    antiTheftAlarm: {
        type: Boolean,
        default: false
    },
    keylessIgnition: {
        type: Boolean,
        default: false
    },
    reverseMode: {
        type: Boolean,
        default: false
    },
    parkingMode: {
        type: Boolean,
        default: false
    },
    tftDisplay: {
        type: Boolean,
        default: false
    },
    sideStandSensor: {
        type: Boolean,
        default: false
    },
    extendedWarranty: {
        type: Boolean,
        default: false
    },
    climbInclination: {
        type: Number,
    },
    motor: {
        motorType: {
            type: String,
            default: "BLDC"
        },
        ratedPower: {
            type: Number,
            required: true
        },
        peakPower: {
            type: Number,
            required: true
        },
        voltage: {
            type: Number,
        },
        torque: {
            type: Number,
        },
        transmission: String
    },
    icai_araiApproved: {
        type: Boolean,
        default: true
    },
    wheelsAndTyres: {
        wheels: {
            wheelType: {
                type: String,
                required: true
            },
            wheelSize: {
                front: {
                    type: Number,
                },
                rear: {
                    type: Number,
                }
            }
        },
        tyres: {
            tyreType: {
                type: String,
            },
            tyreSize: {
                front: {
                    type: String,
                },
                rear: {
                    type: String,
                }
            }
        }
    },
    gearModes: {
        forward: {
            type: Number,
            required: true
        }
    },
    additionalFeatures: {
        type: [String],
        trim: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            username: {
                type: String,
                required: true
            },
             user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            rating: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    images: [
        {
            color: {
                type: String,
                required: true
            },
            paths: [
                {
                    public_id: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);
