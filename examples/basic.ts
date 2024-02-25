import Bir from '../src/bir'

;(async function main() {
  const bir = new Bir({ key: process.env.KEY })
  console.log('StanDanych: ', await bir.value('StanDanych'))
  console.log('StatusUslugi:', await bir.value('StatusUslugi'))
  console.log('KomunikatUslugi:', await bir.value('KomunikatUslugi'))
  console.log('StatusSesji:', await bir.value('StatusSesji'))
  console.log(await bir.search({ regon: '012100784' }))
  console.log(await bir.search({ nip: '5261040567' }))
  console.log(await bir.report({ regon: '011417295', report: 'BIR11OsPrawna' }))
})()