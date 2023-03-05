import React from 'react'

const Typescript = () => {

    const num = 2
    console.log(num.valueOf())

    const fn = (value: number): number => {
        return value
    }

    const fnWithObject = ({ name, isActive }: { name: string, isActive: boolean }): { name: string } => {
        return { name: 'boris' }
    }

    const arr: string[] = []
    arr.push('h')
    // console.log(arr)
    const tuple: [string, number] = ['', 1]

    const test: (string | number)[] = [1, 'hello']

    enum SeatChoice {
        AISLE = 'AISLE',
        MIDDLE = 'MIDDLE',
        WINDOW = 'WINDOW'
    }

    console.log(SeatChoice, SeatChoice.AISLE)

    interface User {
        readonly dbId: number
        name: string
        userId: number
        googleId?: string
        function: () => string
    }

    interface User {
        age: number
    }

    const boris = {
        dbId: 1,
        userId: 1,
        name: 'Boris',
        function: () => 'hello',
        age: 29,
    }

    class Test {

    }

    class User extends Test implements User {
        // name: string
        // email: string
        private city: string

        constructor(public name: string, public email: string) {
            super()
            this.city = 'Kiev'
        }

        get getCity(): string {
            return this.city
        }

        set setCity(city: string) {
            this.city = city
        }
    }

    const testFn = <T extends [], K extends Number>(val: T, number: K): T => {
        console.log(val.length)

        return val
    }

    const arrayFn = <T,>(num: T[]): T => {
        return num[0]
    }

    return (
        <div>

        </div>
    )
}

export default Typescript