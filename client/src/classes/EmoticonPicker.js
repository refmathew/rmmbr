export default class EmoticonPicker {
  static toggleVisibility(emoticonPickerShown, e) {
    // Hide the emoticon-picker when clicked outside of it
    // Trigger only when emoticon picker is shown
    if (emoticonPickerShown) {

      // Reach for the top-most level of e.target's ancestry and store it inside
      // an array. This is to ensure that when the 'emoticon picker' component or
      // any of its child elements is clicked, the emoticon picker won't get
      // closed
      let targetFamilyMember
      targetFamilyMember = e.target
      let targetFamily = []

      while (targetFamilyMember) {
        // push only the nodes which have classList property, i.e., do not
        // include HTML document itself
        if (targetFamilyMember.classList) {
          targetFamily.push(targetFamilyMember)
        }

        targetFamilyMember = targetFamilyMember.parentNode
      }

      // look for if there is an element that contains a class of 'emoji-mart' or
      // 'page-button__emoticon'
      const familyFiltered = targetFamily.find(member =>
        member.classList.contains('emoji-mart') ||
        member.classList.contains('page-button__emoticon')
      )

      if (!familyFiltered) {
        // if such an element does not exist, hide the picker
        actions.falsifyEmoticonPickerShown()

        // reset the value of the chosenPageEmoticon
        actions.mutateChosenPageEmoticon('')
      }
    }
  }
}
